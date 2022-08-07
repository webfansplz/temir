<script lang="ts" setup>
import { TBox, TText } from '@temir/core'
</script>

<template>
  <TBox flex-direction="column" :padding="2">
    <TBox>
      <TBox border-style="single" :margin-right="2">
        <TText>single</TText>
      </TBox>

      <TBox border-style="double" :margin-right="2">
        <TText>double</TText>
      </TBox>

      <TBox border-style="round" :margin-right="2">
        <TText>round</TText>
      </TBox>

      <TBox border-style="bold">
        <TText>bold</TText>
      </TBox>
    </TBox>

    <TBox :margin-top="1">
      <TBox border-style="singleDouble" :margin-right="2">
        <TText>singleDouble</TText>
      </TBox>

      <TBox border-style="doubleSingle" :margin-right="2">
        <TText>doubleSingle</TText>
      </TBox>

      <TBox border-style="classic">
        <TText>classic</TText>
      </TBox>
    </TBox>
  </TBox>
</template>
