import Phaser from 'phaser'; 



export function CreatePlayerAnimation(anims: Phaser.Animations.AnimationManager ) {
    const row3 = 24;
        const row = 6;
        const multi = (row  * 8) - 1;
        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers('player', { start: row3+6, end: row3+8}),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers('effect', { start: multi + 0, end: multi + 7}),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'up',
            frames: anims.generateFrameNumbers('player', { start: row3+0, end: row3+2}),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'down',
            frames: anims.generateFrameNumbers('player', { start: row3+3, end: row3+5}),
            frameRate: 10,
            repeat: -1
        });

        

}

