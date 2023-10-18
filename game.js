const prizes_config = {
  count: 6,
  prize_names: [
    {
      1: "Free MyWays Goodies 🎉 &",
      2: "Chance to win a Trip ✈️",
    },
    {
      1: "Free MyWays Goodies 🎉 &",
      2: "Assured Free Gift by Avya",
    },
    {
      1: "Free Assured Gift by Avya 🎁",
      2: "& Chance to win a Trip ✈️",
    },
    {
      1: "$100 Avya Credits 🥳 &",
      2: "Chance to win a Trip ✈️",
    },
    {
      1: "Free Assured Gift by Avya 🎁",
      2: "",
    },
    {
      1: "Try your luck with Avya 🎡",
      2: "",
    },
  ],
};

const config = {
  type: Phaser.CANVAS,
  width: 1575,
  height: 875,
  backgroundColor: 0xffcc00,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
const game = new Phaser.Game(config);

function preload() {
  //load object, load some images
  this.load.audio("audio", "./Assets/audio.mp3");
  this.load.audio("coin", "./Assets/coin.mp3");

  this.load.image("background", "./Assets/back.jpg");
  this.load.image("wheel", "./Assets/wheel.png");
  this.load.image("pin", "./Assets/pin.png");
  this.load.image("stand", "./Assets/stand.png");
  this.load.image("spin", "./Assets/spin.png");
  this.load.image("spinAgain", "./Assets/spinAgain.png");
  this.load.image("image", "./Assets/image.png");
  this.load.image("tryagain", "./Assets/tryagain.png");

  this.load.image("qr1", "./Assets/qr1.png");
  this.load.image("qr2", "./Assets/qr2.png");
  this.load.image("qr3", "./Assets/qr3.png");
  this.load.image("qr4", "./Assets/qr4.png");
}
function create() {
  //create the background image
  let W = game.config.width;
  let H = game.config.height;

  let background = this.add.sprite(0, 0, "background");
  background.setPosition(W / 2, H / 2);

  //create spin button
  this.spin = this.add.sprite(1190, 390, "spin").setScale(0.3).setInteractive({
    cursor: "pointer",
  });
  this.spin.depth = 1;

  this.spinAgain = this.add
    .sprite(W / 1.35, 750, "spinAgain")
    .setScale(0.8)
    .setInteractive({
      cursor: "pointer",
    });
  this.spinAgain.depth = 1;
  this.spinAgain.visible = false;

  //create the stand
  this.stand = this.add.sprite(W / 1.33, H / 2 + 250, "stand");
  this.stand.setScale(0.29);

  //create a pin
  this.pin = this.add.sprite(W / 1.33, H / 2 - 300, "pin");
  this.pin.setScale(0.25);
  this.pin.depth = 1;

  //create the wheel
  this.wheel = this.add.sprite(W / 1.33, H / 2 - 50, "wheel");
  this.wheel.setScale(0.5);

  //create the wheel
  this.qr1 = this.add.sprite(W / 1.35, H / 2, "qr1");
  this.qr1.setScale(1.5);
  this.qr1.visible = false;
  this.qr2 = this.add.sprite(W / 1.35, H / 2, "qr2");
  this.qr2.setScale(1.5);
  this.qr2.visible = false;
  this.qr3 = this.add.sprite(W / 1.35, H / 2, "qr3");
  this.qr3.setScale(1.5);
  this.qr3.visible = false;
  this.qr4 = this.add.sprite(W / 1.35, H / 2, "qr4");
  this.qr4.setScale(1.5);
  this.qr4.visible = false;

  this.image = this.add.sprite(410, 425, "image");
  this.image.setScale(0.8);

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
  if (this.isSpinning == false) {
    this.spinAgain.on("pointerdown", refresh, this);
  }

  //audio
  this.audio = this.sound.add("audio");
  this.coin = this.sound.add("coin");

  //create text object
  font_style = {
    font: "bold 50px Helvetica",
    align: "center",
    color: "white",
  };

  font_style_2 = {
    font: "bold 30px Helvetica",
    align: "center",
    color: "white",
  };

  font_style_win = {
    font: "bold 40px Monaco",
    align: "center",
    textAlign: "center",
    color: "white",
    stroke: "black",
    strokeThickness: 12,
    padding: {
      x: 12,
      y: 8,
    },
  };

  this.game_text = this.add.text(800, 40, "", font_style_win);
  this.game_text2 = this.add.text(800, 110, "", font_style_win);

  this.spinning_text = this.add.text(250, 140, "", font_style);
  this.spinning_text.visible = false;

  this.tryagain_text = this.add.text(250, 140, "", font_style);
  this.tryagain_text.visible = false;
}

function update() {}

function refresh() {
  console.log("dfk");
  window.location.reload();
}

function spinwheel() {
  this.coin.stop();
  this.audio.play();
  this.isSpinning = true;

  this.spin.visible = false;
  this.spinning_text.visible = true;
  this.tryagain_text.visible = false;

  let rounds = Phaser.Math.Between(3, 5);
  // let degrees = Phaser.Math.Between(0, 5) * 60;

  let random = Phaser.Math.Between(1, 100);

  let degrees = 300;

  if (random >= 1 && random <= 5) {
    degrees = 0;
    console.log(random, 1);
  } else if (random >= 6 && random <= 15) {
    degrees = 60;
    console.log(random, 2);
  } else if (random >= 16 && random <= 40) {
    degrees = 120;
    console.log(random, 3);
  } else if (random >= 41 && random <= 60) {
    degrees = 180;
    console.log(random, 4);
  } else if (random >= 61 && random <= 75) {
    degrees = 240;
    console.log(random, 5);
  } else {
    degrees = 300;
    console.log(random, 6);
  }

  let total_angle = rounds * 360 + degrees;

  let idx = Math.floor(degrees / (360 / prizes_config.count));

  tween = this.tweens.add({
    targets: this.wheel,
    angle: total_angle,
    ease: "Cubic.easeOut",
    duration: 10000,
    scaleX: 0.52,
    scaleY: 0.52,
    callbackScope: this,
    onComplete: function () {
      this.totalSpin += 1;

      this.spinning_text.visible = false;
      this.spin.visible = true;
      this.tryagain_text.visible = true;

      this.prev_length += 1;

      this.game_text.setText(prizes_config.prize_names[idx][1]);
      this.game_text2.setText(prizes_config.prize_names[idx][2]);

      if (idx === 0) {
        this.qr1.visible = true;
      } else if (idx === 1) {
        this.qr2.visible = true;
      } else if (idx === 2) {
        this.qr3.visible = true;
      } else if (idx === 3) {
        this.qr4.visible = true;
      }

      this.wheel.visible = false;
      this.stand.visible = false;
      this.spin.visible = false;
      this.pin.visible = false;
      this.spinAgain.visible = true;

      //audio
      this.audio.stop();
      this.coin.play();

      //next spin
      this.isSpinning = false;
    },
  });
}
