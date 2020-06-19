//Hello World of Phaser => Single Scene in Spin & Win Game

let prizes_config = {
  count: 12,
  prize_names: [
    "3000 Credits",
    "Flat 35% Off",
    "Hard Luck!!!",
    "Flat 70% OFF",
    "Swagpack!!!",
    "Flat 100% OFF",
    "Netflix Subs.",
    "Flat 50% Off",
    "Amazon Voucher",
    "2 Extra Spin",
    "CB Tshirt!!!",
    "CB Book!!!",
  ],
};

let config = {
  type: Phaser.CANVAS,
  width: 1575,
  height: 775,
  backgroundColor: 0xffcc00,

  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
let game = new Phaser.Game(config);

function preload() {
  //load object, load some images
  this.load.audio("audio", "./Assets/audio.mp3");
  this.load.audio("coin", "./Assets/coin.mp3");

  this.load.image("background", "./Assets/back.jpg");
  this.load.image("wheel", "./Assets/wheel.png");
  this.load.image("pin", "./Assets/pin.png");
  this.load.image("stand", "./Assets/stand.png");
  this.load.image("spin", "./Assets/spin.png");
  this.load.image("tryagain", "./Assets/tryagain.png");
}
function create() {
  //create the background image
  let W = game.config.width;
  let H = game.config.height;

  let background = this.add.sprite(0, 0, "background");
  background.setPosition(W / 2, H / 2);

  //create spin button
  this.spin = this.add.sprite(380, 300, "spin").setScale(0.35).setInteractive({
    cursor: "pointer",
  });

  //create the stand
  let stand = this.add.sprite(W / 1.3, H / 2 + 300, "stand");
  stand.setScale(0.29);

  //create a pin
  let pin = this.add.sprite(W / 1.3, H / 2 - 300, "pin");
  pin.setScale(0.29);
  pin.depth = 1;

  //create the wheel
  this.wheel = this.add.sprite(W / 1.3, H / 2, "wheel");
  this.wheel.setScale(0.29);
  this.wheel.angle -= 0.5;

  //spinning
  this.isSpinning = false;
  this.spinning = false;

  //total spins
  this.totalSpin = 0;
  this.prev = [];

  //event listener for mouse click
  if (this.isSpinning == false) {
    this.spin.on("pointerdown", spinwheel, this);
  }

  //audio
  this.audio = this.sound.add("audio");
  this.coin = this.sound.add("coin");

  //create text object
  font_style = {
    font: "bold 50px Arial",
    align: "center",
    color: "red",
  };

  font_style_2 = {
    font: "bold 30px Arial",
    align: "center",
    color: "red",
  };

  this.game_text = this.add.text(100, 40, "Welcome to Spin & Win", font_style);

  this.spinning_text = this.add.text(250, 140, "Spinning...", font_style);
  this.spinning_text.visible = false;

  this.tryagain_text = this.add.text(250, 140, "Try Again!", font_style);
  this.tryagain_text.visible = false;

  this.spin_text = this.add.text(
    100,
    550,
    "Total Spins Till Now: " + this.totalSpin,
    font_style
  );

  this.prev_text = this.add.text(100, 650, "Prev. Winnings: ", font_style_2);
}

//game Loop
function update() {}

function spinwheel() {
  this.coin.stop();
  this.audio.play();
  this.isSpinning = true;

  this.spin.visible = false;
  this.spinning_text.visible = true;
  this.tryagain_text.visible = false;

  let rounds = Phaser.Math.Between(3, 5);
  let degrees = Phaser.Math.Between(0, 11) * 30;

  let total_angle = rounds * 360 + degrees;

  let idx =
    prizes_config.count - 1 - Math.floor(degrees / (360 / prizes_config.count));

  tween = this.tweens.add({
    targets: this.wheel,
    angle: total_angle,
    ease: "Cubic.easeOut",
    duration: 6000,
    scaleX: 0.3,
    scaleY: 0.3,
    callbackScope: this,
    onComplete: function () {
      this.totalSpin += 1;

      if (this.prev.length == 3) {
        this.prev.shift();
      }
      this.prev.push(prizes_config.prize_names[idx]);

      this.spinning_text.visible = false;
      this.spin.visible = true;
      this.tryagain_text.visible = true;

      this.spin_text.setText("Total Spins Till Now: " + this.totalSpin);

      this.prev.forEach((element) => {
        if (this.prev[2] != undefined && this.prev[1] != undefined) {
          this.prev_text.setText(
            "Prev. Winnings: " +
              this.prev[2] +
              ", " +
              this.prev[1] +
              ", " +
              this.prev[0]
          );
        } else if (this.prev[2] == undefined && this.prev[1] != undefined) {
          this.prev_text.setText(
            "Prev. Winnings: " + this.prev[1] + ", " + this.prev[0]
          );
        } else {
          this.prev_text.setText("Prev. Winnings: " + this.prev[0]);
        }
      });

      this.prev_length += 1;

      this.game_text.setText(
        prizes_config.prize_names[idx] != "Hard Luck"
          ? "You won " + prizes_config.prize_names[idx]
          : "Better luck next time"
      );

      //audio
      this.audio.stop();
      this.coin.play();

      //next spin
      this.isSpinning = false;
    },
  });
}
