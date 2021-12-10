import { Telegraf } from 'telegraf'
import fetch from "node-fetch";
import dotenv from 'dotenv'
dotenv.config()

const bot = new Telegraf(process.env.TELEGRAM_TOKEN_EDU);

bot.command("trap", async (ctx) => {

    // YANDEX WEATHER API - I get a temp.

    const response = await fetch("https://api.weather.yandex.ru/v2/forecast?lat=55.950000&lon=37.300000&extra=flase", {
        method: 'get',
        headers: {
            'X-Yandex-API-Key' : process.env.YANDEX_TOKEN
        },
    });

    const data = await response.json();
    const weatherTemp = data.fact.temp;
    const weatherFeelsLike = data.fact.feels_like;

    // RANDOM CATS API

    const responseImage = await fetch("https://aws.random.cat/meow");
    const dataImage = await responseImage.json();

    // Kanye West api - random quotes

    const responseQuote = await fetch("https://api.kanye.rest/");
    const dataQuote = await responseQuote.json();
    const quote = dataQuote.quote;

    return ctx.replyWithPhoto({url: dataImage.file}, {caption: `Погода сегодня ${weatherTemp}°\nОщущается как ${weatherFeelsLike}°\n\n${quote}\n- Kanye West`});
});


bot.command("swag", async (ctx) => {
    ctx.replyWithPoll("Пойдём сегодня гулять?", [`дааааа ☃`, `нееееее 😾`], {is_anonymous: false})
});

bot.launch();
