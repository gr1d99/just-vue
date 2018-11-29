<template>
  <div id="monster-game">
    <section class="row">
      <div class="small-6 columns">
        <h1 class="text-center">YOU</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{width: playerHealth + '%'}">
            {{ playerHealth }}
          </div>
        </div>
      </div>
      <div class="small-6 columns">
        <h1 class="text-center">MONSTER</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{width: monsterHealth + '%'}">
            {{ monsterHealth }}
          </div>
        </div>
      </div>
    </section>

    <section class="row controls" v-if="!gameIsRunning">
      <div class="small-12 columns">
        <button id="start-game" @click="startGame">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-else>
      <div class="small-12 columns">
        <button id="attack" @click="attack">ATTACK</button>
        <button id="special-attack" @click="specialAttack">SPECIAL ATTACK</button>
        <button id="heal" @click="heal">HEAL</button>
        <button id="give-up" @click="giveUp">GIVE UP</button>
      </div>
    </section>

    <section class="row log" v-if="turns.length > 0">
      <div class="small-12 columns">
        <ul>
          <li :key="index" v-for="(turn, index) in turns" :class="{'player-turn': turn.isPlayer, 'monster-turn': turn.isMonster}">
            {{ turn.text }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MonsterGame',
  data: function () {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: []
    }
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true
      this.restorePlayersHealth()
    },
    attack: function () {
      this.applyDamage('player')
      this.applyDamage('monster')
      this.checkHealthStatus()
    },
    specialAttack: function () {
      let damage = this.calculateDamage(20, 10)
      this.logger('player', damage, true)
      this.monsterHealth -= damage
      this.monsterAttack()
      this.checkHealthStatus()
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10
      } else {
        this.playerHealth = 100
      }
      this.logger('player', undefined, undefined, 'heal')
      this.monsterAttack()
    },
    giveUp: function () {
      this.gameIsRunning = false
      this.restorePlayersHealth()
      this.clearLog()
    },
    applyDamage: function (player) {
      let damage
      if (player === 'player') {
        damage = this.calculateDamage(10, 3)
        this.logger('player', damage)
        this.monsterHealth -= damage
        return
      }
      if (player === 'monster') {
        this.monsterAttack()
      }
    },
    restorePlayersHealth: function () {
      this.playerHealth = 100
      this.monsterHealth = 100
    },
    monsterAttack: function () {
      let damage = this.calculateDamage(12, 5)
      this.logger('monster', damage)
      this.playerHealth -= damage
    },
    calculateDamage: function (max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkHealthStatus: function () {
      if (this.monsterHealth <= 0) {
        this.afterWin('You won! New game?')
        return
      }
      if (this.playerHealth <= 0) {
        this.afterWin('You lost! New game?')
      }
    },
    afterWin: function (message) {
      if (confirm(message)) {
        this.startGame()
      } else {
        this.gameIsRunning = false
        this.clearLog()
      }
    },
    logger: function (player, damage, hard = false, kind = 'hits') {
      this.generateLog(player, damage, hard, kind)
    },
    generateLog: function (player, damage, hard, kind) {
      let log = {}
      if (player === 'player') {
        let text = 'Player hits monster for ' + damage
        if (hard) { text = 'Player hits monster hard for ' + damage }
        if (kind === 'heal') { text = 'Player heals for 10' }
        Object.assign(log,
          { isPlayer: true,
            text: text })
      } else if (player === 'monster') {
        Object.assign(log,
          { isMonster: true,
            text: 'Monster hits player for ' + damage })
      }
      this.turns.unshift(log)
    },
    clearLog: function () {
      while (this.turns.length) { this.turns.pop() }
    }
  }
}
</script>

<style>
@import "./../assets/css/monster-game.css";
</style>
