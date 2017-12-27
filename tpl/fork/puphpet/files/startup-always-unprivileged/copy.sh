#!/bin/bash

# Copy custom dotfiles and bin file for the vagrant user from local
if [[ ! -d /home/vagrant/bin ]]; then
	mkdir /home/vagrant/bin
fi
rsync -rvzh --delete /var/www/config/puphpet/homebin/ /home/vagrant/bin/

echo " * rsync'd /var/www/config/puphpet/homebin       to /home/vagrant/bin"