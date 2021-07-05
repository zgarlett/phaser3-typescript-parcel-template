import Phaser from "phaser";
import { Effects } from "~/Base Classes/Effect";
import { Direction } from "~/types";
import { Magic } from "~/SpriteClasses/GameObjectSprite";
import { MagicSpells, LaserGroup, Knight} from "../SpriteClasses";

export default class HelloWorldScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private direction: Direction;
  private shootButton: Phaser.Input.Keyboard.Key | undefined;
  private bullets: LaserGroup | undefined;
  private knight: Knight | undefined;
  private magicKey: Phaser.Input.Keyboard.Key | undefined;
  private magicSprite: Phaser.GameObjects.Sprite | undefined;
  private effectSprite: Magic | undefined;
  constructor() {
    super("hello-world");
    this.direction = "up";
  }

  preload() {
    this.load.image("ground", "assets/tiles/TileMap.png");
    this.load.tilemapTiledJSON("map", "assets/map/WorldMap.json");
    this.load.spritesheet("player", "assets/sprites/AlienBob.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("effect", "assets/sprites/Effects.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.extraAnimations();
    const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: "map" });
    map.addTilesetImage("World", "ground", 32, 32);

    //  Then create the layers

    map.createLayer("ground", "World");
    let collideLayer = map
      .createLayer("features", "World")
      .setCollisionByProperty({ collision: true })
      .setCollisionFromCollisionGroup(true);
    this.knight = new Knight(this, 300, 400, "player", 24);
    this.magicSprite = this.add.sprite(300, 400, "effect", 8);
    this.physics.add.collider(this.knight, collideLayer);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.knight!);
    const { S } = Phaser.Input.Keyboard.KeyCodes;
    this.magicKey = this.input.keyboard.addKey(S);
    this.effectSprite = new Magic(this.knight, this, 100, 100, "effect", 16);

  }

  update(time: number, delta: number) {
    if (
      this.magicKey &&
      this.magicKey.isDown &&
      this.knight &&
      this.magicSprite
    ) {
      this.magicSprite.setPosition(
        this.knight.x + 50 || 200,
        this.knight.y + 50 || 200
      );
      console.log("ice");
      //this.effectSprite?.play({key: 'ice', frameRate: 5}, true);
      //this.magicSprite.setActive(true);
      //this.magicSprite.setVisible(true);
      //this.effectSprite.play("fire");
    } else {
      //this.magsicSprite.setActive(false);
      //this.magicSprite.setVisible(false);
    }
  }

  createAnimatioinIntervale(
    row: number,
    rowLength: number
  ): { start: number; end: number } {
    if (row > 1) {
      const start = row * rowLength;
      const end = start + rowLength - 1;
      return { start, end };
    }
    return { start: 0, end: rowLength - 1 };
  }

  extraAnimations() {
    this.anims.create({
      key: "fire",
      frames: this.anims.generateFrameNames("effect", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0],
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "ice",
      frames: this.anims.generateFrameNames("effect", { start: 8, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
