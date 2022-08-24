
#   STW-IonicApp        #
#   GALLERY IONIC APP   #         

DEPLOYMENT:

First of all install ionic tooling

    npm install -g @ionic/cli@latest
    
Go to your project folder

    cd projectName

Install dependencies:

    npm install

Add the platform in the project:

    ionic capacitor add android/ios
    
Sync the project and update it:
    
    ionic capacitor sync
    
Open lab debugger in your browser:
    
    ionic serve -l
    
Build the project and open your IDE:

    ionic capacitor build ios/android
    
    
# BEFORE RUNNING THE APP #

IN ANDROID PLATFORM:

    Add in android/app/src/main/AndroidManifest.xml the next permissions:
    
        1. <uses-permission android:name="android.permission.INTERNET" />
        2. <uses-permission android:name="android.permission.CAMERA" />
        3. <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
        4. <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    
IN IOS PLATFORM:
    
 Add in Info.plist the next permissions to allow camera and storage.
 It's important to add a string value with a short description for the user:
    
        1. NSCameraUsageDescription
        2. NSPhotoLibraryUsageDescription
        3. NSLocationWhenInUseUsageDescription
        4. NSPhotoLibraryAddUsageDescription
        5. NSMicrophoneUsageDescription
        
 Check if the option App Transport Security Settings -> Allow Arbritary Loads is set to YES.
 This will allow you do http requests


SERVER:
 
 Server directory, in my case I use a nginx server from a debian distro:
 
 1. index.php, the first view in your server, where the images will be displayed
 2. upoad.php, script that accepts the http request in order to upload the images
 3. uploads, directory where the images will be stored
 
 In order to upload big pictures you have to declare in nginx.conf client_max_body_size.
 And increase this two parameters in your php.ini file: upload_max_filesize, max_file_uploads
  
    
