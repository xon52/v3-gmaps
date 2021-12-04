# Typescript

Google Maps does come with its own type definitions: [@types/google.maps](https://www.npmjs.com/package/@types/google.maps)

These were used to make `v3-gmaps` but weren't used as the exported types because of some unnecessary overhead in creating acceptable objects to be consumed in things like props.

Instead, `v3-gmaps` comes with its own, simpler and more Vue component friendly types. The added bonus is I included the definitions in the package so you don't need another package to use them.

For now, this would be the best way to browse the types is by checking out [src/types/types.ts](https://github.com/xon52/v3-gmaps/blob/main/src/types/types.ts).

:::warning
This is my first time making types like this so keen for feedback or advice on how to improve it.
:::
