class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // fox run
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('fox', {start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: 0
        });
    }

    update(){        
        this.scene.start("playScene");
    }
}