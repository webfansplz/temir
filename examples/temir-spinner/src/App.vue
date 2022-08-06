<script lang="ts" setup>
import { TBox, TText } from '@temir/core'
import TSpinner from '@temir/spinner'
</script>

<template>
  <TBox
    :margin="5"
    width="20"
    border-style="round"
    justify-content="center"
  >
    <TText>
      <TText color="yellow">
        <TSpinner type="clock" />
      </TText>
      Loading
    </TText>
  </TBox>
</template>
