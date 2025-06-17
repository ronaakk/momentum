import createClient from '@/utils/supabase/client'

const DEFAULT_AVATAR_URL = '/assets/images/default-avatar.svg'

// TODO: 06/13/2025 - Make sure all these functions work, they should allow access to profile images and upload pictures properly
// This will create a signed url for access, or just provide the default avatar
export const getProfileImageUrl = async (currImageUrl) => {
    try {
        const supabase = createClient()

        // if profile image field is null return default avatar
        if (!currImageUrl) {
            return DEFAULT_AVATAR_URL
        } else {
            // generate the signed url for supabase access
            const { data : { signedUrl }, error : urlError } = await supabase
                .storage
                .from('profile-pictures')
                // this signed url will expire in a day (better security compared to before)
                // we need to pass the profile_image path name to match the file name we have in our bucket
                .createSignedUrl(currImageUrl, 24 * 60 * 60)

            if (urlError) throw urlError
            return signedUrl  
        }
    } catch (error) {
        console.log('There was an error retrieving the profile image url:', error)
        return DEFAULT_AVATAR_URL
    }
}

export const uploadProfileImage = async (userId, file) => {
    try {
        const supabase = createClient()

        // setting the file name to associate with user ids
        const fileName = `${userId}/profile.jpg`

        const { error : uploadError } = await supabase.storage.from('profile-pictures').upload(fileName, file, {
            contentType: file.type,
            upsert: True 
        })

        if (uploadError) {
            throw uploadError
        } else {
            // update the user in users table to just the file name, not the signed url, we need this later to create a 
            // matched signed url for it
            const { error : updateError } = await supabase
                .from('users')
                .update({ profile_image : fileName })
                .eq('id', userId)

            if (updateError) throw updateError
            
            // return True to indicate saving was a success
            return True
        }
    } catch (error) {
        console.log("An error occured saving this new image to the bucket:", error)
        return False
    }
}

export const deleteProfileImage = async (userId) => {
    try {
        const supabase = createClient()

        const filesToDelete = [
            `${userId}/profile.jpg`,
        ]

        const { error : deleteError } = await supabase
            .storage
            .from('profile-pictures')
            .remove(filesToDelete)
        
        if (deleteError) {
            throw deleteError
        } else {
            // update the users table to NULL
            const { error : updateError } = await supabase
                .from('users')
                .update({ profile_image : null })
                .eq('id', userId)

            if (updateError) {
                throw updateError
            }
            
            return True
        }   
    } catch (error) {
        console.log("An error occured when trying to delete this image:", error)
        return False
    }
}

// this will be used in our callback.ts from google auth
// the supabase param being passed here is the admin one
export const migrateGoogleImage = async (supabase, googleImageUrl, userId) => {
    try {
        const response = await fetch(googleImageUrl)
        if (!response.ok) {
            throw new Error('Failed to retrieve google image')
        }

        // extracting the profile picture into a format we can use
        const blob = await response.blob()
        const fileName = `${userId}/profile.jpg`

        // save it to our bucket
        const { error : uploadError } = await supabase.storage
            .from('profile-pictures')
            .upload(fileName, blob, {
                contentType: blob.type,
                upsert: true
            })

        if (uploadError) throw uploadError

        const { error : fieldUpdateError } = await supabase
            .from('users')
            .update({ profile_image : fileName })
            .eq('id', userId)
        
        if (fieldUpdateError) throw fieldUpdateError
    } catch (error) {
        console.log('Something went wrong migrating the google image: ', error)
    }
}