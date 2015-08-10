# Journey to Space - 0504 - Powering your Spacecraft

A spacecraft’s energy system must be engineered to keep power flowing to vital life support systems at all times. This game/simulation let's you explore that situation.

## Automatic install instructions

You can install this application using the private SMM Boxen repo. This requires an internal SMM account.
First, install the basic boxen repo, using our [Boxen setup script](https://github.com/scimusmn/boxen-setup). 
Once the Boxen script has run through without errors, you can run the custom Powering you Spacecraft install.

    boxen space_0504_energy_management

## Manual Installation

### Install the application

    cd ~/Desktop
    git clone https://github.com/scimusmn/jts-0504-spacecraft.git source
    cd ~/Desktop/source
    bower install

TODO: Document the correct answer to the bower jquery version issue.

### Configure the application

   cd ~/Desktop/source/data
   cp settings.default.xml settings.xml

Edit the settings.xml file, defining the correct values for this physical
install of the Energy Management component. Most of the default values are
fine, but you may need to adjust the wiring toggle and the solar panel
multipliers, depending on the physical exhibit.

### Install Stele (kiosk browser)

    cd ~/Desktop
    git clone https://github.com/scimusmn/stele.git

### Configure Stele

    cd ~/Desktop/stele/cfg
    cp browser.cfg.default browser.cfg

Edit the Stele config file, making the relevant entries match the values below.

    delay: true
    delay_seconds: 60
    home_url: file://localhost/Users/exhibits/Desktop/source/index.html
    kiosk: true
