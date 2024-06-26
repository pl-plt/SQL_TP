# MongoDB handler app

## Prerequisite
> You will need to have NodeJS installed. If not, check https://nodejs.org/en and download the latest version.
> You will need to have mongoDB installed, for that, check the installation guide below \

## Quick start
> Once you have installed everything needed, you can install required packages with the command \
```npm install ``` \
> Next you will need to populate the database. \ > For that, you can use the script entitled populateDB: \
> In vscode simply open the debugger, choose "Node.js..." and then click on "Run script: populate DB" \
> You can also run the command from a terminal with the command \
```npm run populateDB``` \
> If the populate is successful, you will see a message "Sample data inserted" in the shell.
> You can now stop this script and run the main one.
> In a new shell, run the script "Run script: start" or enter the command ```npm run start``` \
> Once you see the message "Connected to MongoDB", you are connected. \
> You can now see the site at http://localhost:3000


# Install mongoDB on windows

## Downloads and install packages
> First, install mongoDB (and mongoDB compass for GUI) following this guide:\
> https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
>
> Then, you will have to install mongosh, the command prompt for mongo. It is available for download here:\
> https://www.mongodb.com/docs/mongodb-shell/
>
## Now you have to edit your environnement variables
> First, go to your system properties by pressing windows and then in the search bar search for "env" and click on "Edit the system environment variables"\
> Then go to the "Environment variables" button located on the bottom right\
> Click on the "Path" variable and select "Edit..." (Note: it is wiser to do these next step for both system and user variables)\
> On the new menu, select the button "Add" and add the bin location of your mongoDB file, it is located by default at something like "C:/Program Files/MongoDB/Server/X.Y/bin"  where X.Y is your version of mongoDB\
> Repeat this step with mongosh, located by default at "C:\Users\XXXXX\AppData\Local\Programs\mongosh"\

And that's it! You have set up mongoDB and its shell, you can now start a windows powershell and to start the server, type\
```mongod```

And to have the console, type\
```mongosh```