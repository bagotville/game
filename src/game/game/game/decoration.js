let speed = 3;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let imageInner;

function Resize() {
    let canvas = document.getElementById("canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

Resize()

window.addEventListener('resize', () => {
    Resize()
})

class Background {
    image;
    x;
    y;

    constructor(image, x) {
        this.x = x;
        this.y = 0;

        this.image = new Image();
        this.image.src = image;
    }

    goRight(background) {
        this.x -= speed;

        console.log(this.x)
        if (this.x < -(imageInner / 2)) {
            this.x = 0;
        }
    }

    goLeft(background) {
        this.x += speed;


        if (this.x > 0 - speed) {
            this.x = -(imageInner / 2);
        }
    }
}

let backgrounds =
    [
        new Background("../background2.jpg", 0),
    ];

class Decoration {
    goRight() {
        backgrounds[0].goRight();

        this.render()
    }

    goLeft() {
        backgrounds[0].goLeft();

        this.render()
    }

    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Очистка холста от предыдущего кадра

        const total = Math.ceil(window.innerWidth / backgrounds[0].image.width) * 2

        let sumWidth = 0;

        for (let i = 0; i < total; i++) {

            ctx.drawImage(
                backgrounds[0].image, //Изображение для отрисовки
                0, //Начальное положение по оси X на изображении
                0, //Начальное положение по оси Y на изображении
                backgrounds[0].image.width, //Ширина изображения
                backgrounds[0].image.height, //Высота изображения
                backgrounds[0].x + sumWidth, //Положение по оси X на холсте
                backgrounds[0].y, //Положение по оси Y на холсте
                backgrounds[0].image.width, //Ширина изображения на холсте
                backgrounds[0].image.height //Так как ширина и высота фона одинаковые, в качестве высоты указывается ширина
            );

            sumWidth += backgrounds[0].image.width
        }

        imageInner = sumWidth;

        let img = new Image()
        img.src = "./player.png"

        ctx.drawImage(
            img, //Изображение для отрисовки
            0, //Начальное положение по оси X на изображении
            0, //Начальное положение по оси Y на изображении
            backgrounds[0].image.width, //Ширина изображения
            backgrounds[0].image.height, //Высота изображения
            innerWidth / 2 - 50, //Положение по оси X на холсте
            32, //Положение по оси Y на холсте
            400, //Ширина изображения на холсте
            50 //Так как ширина и высота фона одинаковые, в качестве высоты указывается ширина
        );
    }
}

export const decoration = new Decoration()
export const background = new Background()
