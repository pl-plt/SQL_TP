# File to check for learning

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#defining_the_locallibrary_schema


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