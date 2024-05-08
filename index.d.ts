export type pokemon = {
    id: number
    url: string
    name: string
    types: { name: string }[]
    sprites: {
      other: {
        dream_world: {
          front_default: string
        }
      }
    }
    height: number
    weight: number
    abilities: { ability: { name: string } }[]
    stats: { stat: { name: string }; base_stat: number }[]
    error: string
  };

export type ThemeColorProps = {
    selectedColor: string | void
}