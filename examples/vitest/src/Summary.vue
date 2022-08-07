<script lang="ts" setup>
import { computed, defineProps } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'

const props = defineProps(['passed', 'failed', 'duration', 'startAt'])
</script>

<template>
  <TBox box flex-direction="column" :margin-top="1">
    <TBox>
      <TBox :width="14" justify-content="flex-end">
        <TText :dim-color="true" :bold="true">
          Test Fliles
        </TText>
      </TBox>
      <TText color="green" :bold="true">
        1 passed
      </TText>
    </TBox>

    <TBox>
      <TBox :width="14" justify-content="flex-end">
        <TText :dim-color="true" :bold="true">
          Tests
        </TText>
      </TBox>
      <TText :bold="true">
        <TText v-show="props.failed" color="red">
          {{ ` ${props.failed}` }} failed
          <TText v-show="props.passed">
            |
          </TText>
        </TText>
        <TText v-show="props.passed" color="green">
          {{ props.passed }} passed
        </TText>

        <TText :dim-color="true">
          {{ `(${props.failed + props.passed})` }}
        </TText>
      </TText>
    </TBox>

    <TBox>
      <TBox :width="14" justify-content="flex-end">
        <TText :dim-color="true" :bold="true">
          Duration
        </TText>
      </TBox>
      <TText>
        {{ ` ${props.duration}` }}
      </TText>
    </TBox>
  </TBox>
</template>
