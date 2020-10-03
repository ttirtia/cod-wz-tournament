#!/usr/bin/env bash

set -Eeuo pipefail

# Team leaders for the 2020-10-04 tournament
declare users=(
  Ha3d3s#5060339
  Jasoff92#3540605
  th2ib#5727937
  J_Æther#3098296
)

for user in "${users[@]}"
do
  points=$(node index.js "${user}" | grep 'Total points' | tail -1 | sed -E 's/.* ([0-9]+)$/\1/')
  user_short=$(<<<${user} sed -E 's/(.*)#.*/\1/')
  echo "Team of ${user_short}: ${points} points"
done
