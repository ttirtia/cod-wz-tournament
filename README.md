# CoD MW : private tournament helper

## What is this ?

Ugly NodeJS app to retrieve the results of a private Warzone tournament.

## How can I use this ?

1. Create a file named `secrets.json` next to `index.js` that should contain your Activision credentials

```json
{
  "email": "me@example.com",
  "password": "supersecret"
}
```

2. Install the dependencies with `npm`

```bash
npm install
```

3. Get the results for a particulier user

```bash
node index.js ${ACTIVISION_USERNAME}
```

4. Or use modify and use the shell script to loop over a list of players

```bash
./all_players.sh
```
