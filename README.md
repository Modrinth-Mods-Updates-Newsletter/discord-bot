## Modrinth-Mods-Updates-NewsLetter/discord-bot
The official MMUN's discord bot, for the guild or even the user!

> [!NOTE]
> This is an official Discord bot for MMUN but NOT affiled with Modrinth.

This bot mentions you when you follow a Modrinth mod.
Currently in development so not working.

Simple, one command and you're done!

### Test/Execute the bot/Contribute
1. [Install bun](https://bun.sh)
2. `git clone https://github.com/Modrinth-Mods-Updates-Newsletter/discord-bot.git`
3. `cd discord-bot`
4. `bun i`
5. `bun start`

> [!TIP]
> If you want to contribute, please go to our [Discord guild](https://discord.gg/ZE8dECRmXW) and send your suggestion on the channel [#Suggestions](https://discord.gg/ZE8dECRmXW) to be approved because imagine that your suggestion is rejected: we don't want you to work for nothing (you can do ofc) ;)

### Compile
`bun build:execs` and check `dist/`

### Archive code
`bun build:archives` and check `dist/`

### Enable automatic start (optional)
To enable the automatic start of the program at the launch of the computer, you must generate one for your computer.
> Execute `bun build:service`

And enable the service with the superuser
> Execute `sudo systemctl enable ./mmundiscbot.service`

And you can now start the service without restart
> Execute `sudo systemctl start mmundiscbot`

> [!IMPORTANT]
> If you're not on your past computer which you have the `.service` file saved, this may not work with your new computer, so re-execute the command to patch the .service file, and re-enable the service.

Made by [Marax](https://discord.com/users/131382958206694976) ([131382958206694976](https://discord.com/users/131382958206694976))
