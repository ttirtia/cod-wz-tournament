"use strict";

if (process.argv.length != 3) {
  console.error("Please pass a username as the only arg");
  process.exit(1);
}

const fs = require("fs");

const API = require("call-of-duty-api")({ platform: "acti" });

const gameMode = "br_brtrios";
const matchCount = 6;
const placementBonus = [6, 4, 3, 2, 1];
const player = process.argv[2];
const secretsFile = "secrets.json";
const secrets = JSON.parse(fs.readFileSync(secretsFile));

function main() {
  let index = 0;
  let totalPoints = 0;

  API.MWcombatwz(player)
    .then((data) => {
      index = 0;
      const filteredMatches = data.matches.filter(function (match) {
        return match.mode == gameMode;
      });

      filteredMatches.slice(0, matchCount).forEach((match) => {
        API.MWFullMatchInfowz(match.matchID).then((matchData) => {
          const results = matchData.allPlayers.filter(function (player) {
            return (
              player.playerStats.teamPlacement ==
              match.playerStats.teamPlacement
            );
          });

          totalPoints += printMatchResults(
            index++,
            match.playerStats.teamPlacement,
            results
          );

          console.log(" => Total points: " + totalPoints);
          console.log();
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

function printMatchResults(gameNumber, teamPlacement, results) {
  let totalKills = 0;

  console.log("Game " + (matchCount - gameNumber));
  console.log("---");
  console.log("Kills summary:");
  results.forEach((result) => {
    totalKills += result.playerStats.kills;
    console.log(
      "  " + result.player.username + ": " + result.playerStats.kills
    );
  });

  console.log("Total kills: " + totalKills);
  console.log("Placement: " + teamPlacement);

  const points =
    teamPlacement -
    totalKills -
    (teamPlacement < placementBonus.length
      ? placementBonus[teamPlacement - 1]
      : 0);

  console.log("Points: " + points);
  console.log();

  return points;
}

API.login(secrets.email, secrets.password)
  .then((_) => {
    main();
  })
  .catch((err) => {
    console.error(err);
  });
