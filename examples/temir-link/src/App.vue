<script lang="ts" setup>
import { TBox, TText } from '@temir/core'
import TLink from '@temir/link'
</script>

<template>
  <TBox
    :margin="5"
    width="20"
    border-style="round"
    justify-content="center"
  >
    <TLink url="https://github.com">
      <TText color="yellow">
        Hi
      </TText>
      <TText color="cyan">
        Github
      </TText>
    </TLink>
  </TBox>
</template>
