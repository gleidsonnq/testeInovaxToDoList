/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'blue-sep':'rgb(27,29,55)',
        'blue-let':'rgb(67,126,177)',
        'blue-let2':'rgb(99,106,199)',
        'blue-box':'rgb(105,197,224)',
        'green-box':'rgb(3,139,0)',
        'back-whi':'rgb(254,254,254)'
      },
      height: {
        '15': '15px',
        '19': '19px',
        '25': '25px',
        '37.5px': '37.5px',
        '39': '39px',
        '79': '79px',
        '79': '79px',
        '140': '140px',
        '626': '626px',
        '784': '784px',
      },
      width: {
        '17': '17px',
        '25': '25px',
        '35': '35px',
        '37': '37px',
        '45': '45px',
        '46': '46px',
        '81': '81px',
        '107': '107px',
        '109': '109px',
        '128': '128px',
        '130': '130px',
        '731': '731px',
        '747': '747px',
        '771': '771px',
        '860': '860px',
        '900': '900px',
        '1440': '1440px',
      }
    },
  },
  plugins: [],
}
