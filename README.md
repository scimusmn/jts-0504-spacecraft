# Journey to Space - 0504 - Powering your Spacecraft

A spacecraft’s energy system must be engineered to keep power flowing to vital life support systems at all times. This game/simulation let's you explore that situation.

## Installation

### Install the application

    cd ~/Desktop
    git clone https://github.com/scimusmn/jts-0504-spacecraft.git source
    cd ~/Desktop/source
    bower install

TODO: Document the correct answer to the bower jquery version issue.

### Install Stele (kiosk browser)

    cd ~/Desktop
    git clone https://github.com/scimusmn/stele.git

### Configure Stele

    cd ~/Desktop/stele/cfg
    cp browser.cfg.default browser.cfg

Edit the config file, making the relevant entries match the values below.

    delay: true
    delay_seconds: 60
    home_url: file://localhost/Users/exhibits/Desktop/source/index.html
    kiosk: true
