#If the folder exists, remove it first, then copy the files
if [ -d "./dist/" ]; then

    rm -rv ./../server/public/${APP_NAME}/*
    mv -v build/* ./dist

#Else make a new folder and then move the files.
else
    mkdir -p ./dist
    mv -v build/* ./dist
fi