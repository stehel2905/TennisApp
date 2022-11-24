let data;

/*
k=32 og S=400 er hentet fra sjakk, men er i utganspunktet fritt velgbare variabler som påvirker utfallet av en ELO-kalkulasjon

- Ved ratingforskjell på 200 poeng har vinneren følgende vinnersjanse basert på S
S = 200 | 90%
S = 400 | 75%
S = 600 | 68%

- K påvirker utslaget end match gjør på rating. I følgende eksempel er spiller 1 75% sannsynlig til å vinne
    [K]    [Spiller 1 vinner]       [Spiller 2 vinner]
    32            +-7                     +-24
    10            +-2                     +-7
    50            +-12                    +-37
*/

const k = 50; // Høyere K gir større utslag i rating
const S = 400; //Lavere S gir større utslag basert på forskjell i rating
const spiller1 = {
    rating: 1000,
}
const spiller2 = {
    rating: 1200,
}
const spiller3 = {
    rating: 1200,
}
const spiller4 = {
    rating: 1400,
}


function calcExpectation(vinner, taper) {
    let step1 = taper - vinner;
    let step2 = step1 / S;
    let step3 = Math.pow(10 , step2);
    let step4 = 1 + step3;
    let step5 = 1 / step4;

    return step5;
}

function calculateScore(vinner, taper) {
    let eoVinner = calcExpectation(vinner.rating, taper.rating)
    let eoTaper = calcExpectation(taper.rating, vinner.rating)
    console.log('eoVinner: ' + eoVinner + ' eoTaper: ' + eoTaper)

    let vinnerGain = (k * (1 - eoVinner))
    let taperLoss = (k * (0 - eoTaper))
    let nyVinner = vinner.rating + vinnerGain;
    let nyTaper = taper.rating + taperLoss

    console.log('Vinners nye rating: ' + nyVinner + '\nTapers nye rating: '
        + nyTaper + '\nVinners okning: ' + vinnerGain +
    '\nTapers senkning: ' + taperLoss + '\n')
}

calculateScore(spiller1, spiller2)
calculateScore(spiller4, spiller3)
