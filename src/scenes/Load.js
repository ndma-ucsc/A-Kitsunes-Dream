class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        this.load.path = "./assets/bg/";
        this.load.image('fox1_bg', 'dark_forest.png');

        // these need to be atlas later
        this.load.path = "./assets/fox_sprites/";
        this.load.spritesheet('fox1', 'base_fox.png', {frameWidth: 128, frameHeight: 87, startFrame: 0, endFrame: 3});
        this.load.spritesheet('fox2', 'base_fox2.png', {frameWidth: 148, frameHeight: 96, startFrame: 0, endFrame: 4});
        this.load.spritesheet('fox3', 'water_fox1.png', {frameWidth: 148, frameHeight: 96, startFrame: 0, endFrame: 4});

        this.load.spritesheet('fox7', 'light_fox.png', {frameWidth: 148, frameHeight: 96, startFrame: 0, endFrame: 4});
        this.load.spritesheet('fox8', 'dark_fox.png', {frameWidth: 148, frameHeight: 96, startFrame: 0, endFrame: 4});

        this.load.path = "./assets/ost/";
        this.load.audio('menu_ost', 'I_Am_Different.mp3');
        this.load.audio('fox1_ost', 'Dreams_of_the_Brilliant.mp3');
        this.load.audio('fox2_ost', 'The_Long_Journey.mp3');
        this.load.audio('fox3_ost', 'Water_Spirit.mp3');
        this.load.audio('fox4_ost', 'Wind_Spirit.mp3');
        this.load.audio('fox5_ost', 'Earth_Spirit.mp3');
        this.load.audio('fox6_ost', '.mp3');
        this.load.audio('fox7_ost', 'Days_of_Summer.mp3');
        this.load.audio('fox8_ost', 'Days_of_Winter.mp3');
        this.load.audio('fox9_ost', 'Into_The_Sky.mp3');
        this.load.audio('death_ost','Autumn_Rain.mp3')
        
        this.load.path = "./assets/misc/";
        this.load.image('start', 'start.png');


        /* test loading bar buffer*/
        // this.load.image('background', 'images/tut/background.png');
        // for(var i =0;i<30;i++) {
		// 	this.load.image('background_'+i, 'images/tut/background.png');
		// };

        // loading bar frame
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(game.config.width / 4, game.config.height / 2, game.config.width / 2, 50);
        
        // loading... text
        var loadingText = this.make.text({
            x: game.config.width / 2 + 5,
            y: game.config.height / 2 - 30,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // loading percent text
        var percentText = this.make.text({
            x: game.config.width / 2,
            y: game.config.height / 2 + 70,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // loader
        this.load.on('progress', function (value) {
            // console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            
            // active loading bar
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(game.config.width/4 + 10, game.config.height/2 + 10, (game.config.width / 2 - 20) * value, 30);
        });

        // load tracking
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        
        // destroy loading bar
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();	
            loadingText.destroy();
            percentText.destroy();
        });
    }

    create() {
        this.time.delayedCall(1000, () => {this.scene.start("openScene");})
    }

    update(){        
        
    }
}