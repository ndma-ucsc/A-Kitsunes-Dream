class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.obstacleSpeed = -450;
        this.JUMP_VELOCITY = -750;
        this.MAX_JUMPS = 1;
        this.SCROLL_SPEED = 3;
        currentScene = 3;
        this.physics.world.gravity.y = 3000;

        this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0);

        // create player sprite
        this.fox = this.physics.add.sprite(120, game.config.height - 3 * tileSize + 22, 'fox');

        // make ground tiles group (actual ground)
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'texture_atlas', 'tile_block').setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // pseudo ground
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'random_tile_block').setOrigin(0);

        // add physics collider
        this.physics.add.collider(this.fox, this.ground);

        // add obstacles
        // set up barrier group and add first barrier to kick things off
        this.obstacles = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.spawnObstacle();

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        
        this.gameOver = false;
    } // end of create()

    spawnObstacle() {
        let obstacle = new Obstacle(this, this.obstacleSpeed);     // create new barrier
        this.obstacles.add(obstacle);        
    }

    update(){

        if(!this.gameOver){
            this.talltrees.tilePositionX += this.SCROLL_SPEED;
            this.groundScroll.tilePositionX += this.SCROLL_SPEED;

            this.jumpUpdate();

            // check for collisions
            this.physics.world.collide(this.fox, this.obstacles, this.foxCollision, null, this);
        }

    } // end of update()

    foxCollision() {
        this.gameOver = true;                    // turn off collision checking
        // this.sound.play('death', { volume: 0.5 });  // play death sound

        // create tween to fade out audio
        // this.tweens.add({
        //     targets: this.bgm,
        //     volume: 0,
        //     ease: 'Linear',
        //     duration: 2000,
        // });
       
        // kill paddle
        this.fox.destroy();              
        // switch states after timer expires
        // this.time.delayedCall(3000, () => { this.scene.start('gameOverScene'); });
    }

    jumpUpdate(){
        // check if fox is grounded
	    this.fox.isGrounded = this.fox.body.touching.down;
	    // if so, we have jumps to spare
	    if(this.fox.isGrounded) {
            this.fox.anims.play('run', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
        }
        // else {
	    // 	this.fox.anims.play('jump');
	    // }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 200)) {
	        this.fox.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
    }
}