module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'raleway': 'Raleway',
      'roboto': 'Roboto'
    },
    extend: {
      colors: {
        'darkblue': '#1F3075',
        'brightorange': '#ec5e04',
        'bluegray': '#88B3C6',
        'lightgray': '#f5f5f5',
        'offwhite': '#fafafa'
      },
      gridTemplateColumns: {
        'cards': '50% minmax(144px, 1fr)'
      },
      backgroundImage: theme => ({
        'main': "url('../img/bg-main.svg')",
        'main-lg': "url('../img/bg-main-lg.svg')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
