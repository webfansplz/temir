<script lang="ts" setup>
import { TBox, TText } from '@temir/core'
import { faker } from '@faker-js/faker'
const users = new Array(10).fill(true).map((_, index) => ({
  id: index,
  name: faker.internet.userName(),
  email: faker.internet.email(),
}))
</script>

<template>
  <TBox flex-direction="column" :width="80" border-style="round">
    <TBox>
      <TBox width="10%">
        <TText>ID</TText>
      </TBox>

      <TBox width="45%">
        <TText>Name</TText>
      </TBox>

      <TBox width="45%">
        <TText>Email</TText>
      </TBox>
    </TBox>

    <TBox v-for="user in users" :key="user.id">
      <TBox width="10%">
        <TText>{{ user.id }}</TText>
      </TBox>

      <TBox width="45%">
        <TText>{{ user.name }}</TText>
      </TBox>

      <TBox width="45%">
        <TText>{{ user.email }}</TText>
      </TBox>
    </TBox>
  </TBox>
</template>
