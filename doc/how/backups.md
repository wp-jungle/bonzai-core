Backups
=======

Each time you stop your Virtual Machine, some database backup scripts will be executed on it to dump the local database.
The Sql files will be save in `backups/databases`. Note that theses are simply local dump backups, this will not help
you to backup your live website, but this will help you in case your VM can't boot anymore, or when you needed to
destroy it.

> You should sometimes check this folder because a huge site can generate a lot of large backups sql files.