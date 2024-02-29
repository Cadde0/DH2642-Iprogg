import { getScheduleToday, getClubScheduleWeek } from "../apiCalls";
import resolvePromise from './resolvePromise';
import moment from 'moment-timezone';
import { observable } from "mobx";

const createGame = (game) => {
    // Convert UTC time to Swedish local time
    const localTime = moment.utc(game.startTimeUTC).tz('Europe/Stockholm');
    const formattedDate = localTime.format('YYYY-MM-DD');
    const formattedTime = localTime.format('HH:mm');
    

    return { 
        id: game.id,
        date: formattedDate, 
        time: formattedTime,
        venue: game.venue.default,
        homeTeam: game.homeTeam.abbrev,
        awayTeam: game.awayTeam.abbrev
    };
};



const getDynamicWeekDateRange = () => {
    const today = moment().format('YYYY-MM-DD');
    const oneWeekFromToday = moment().add(6, 'days').format('YYYY-MM-DD');
    return [today, oneWeekFromToday];
};

const generateDateRange = (startDate, endDate) => {
    let dates = [];
    let currentDate = moment(startDate);

    while (currentDate <= moment(endDate)) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'days');
    }
    return dates;
};

const groupGamesByDate = (games, startDate, endDate) => {
    let groupedGames = {};

    const allDates = generateDateRange(startDate, endDate);
    allDates.forEach(date => {
        groupedGames[date] = [];
    });

    games.forEach(game => {
        if (groupedGames[game.date]) {
            groupedGames[game.date].push(game);
        }
    });

    return groupedGames;
};

const scheduleModel = observable({
    games: {},
    teamGames: {},
    schedulePromiseState: {},
    
    // Fetches and creates game object, with all games on their corresponding dates (Swedish time)
    async fetchWeeklySchedule() {
        await resolvePromise(getScheduleToday(), this.schedulePromiseState);

        if (this.schedulePromiseState.data) {
            const games = this.schedulePromiseState.data.gameWeek
                .flatMap(week => week.games.map(createGame));

                // Determine the dynamic date range starting from today
            const [startDate, endDate] = getDynamicWeekDateRange();

            // Group games by Swedish date, including all dates in the range
            this.games = groupGamesByDate(games, startDate, endDate);
        }
        else if (this.schedulePromiseState.error) {
            console.error("Error fetching weekly schedule: ", this.schedulePromiseState.error);
        }
    },

    // Fetches and creates game object, with all games on their corresponding dates (Swedish time)
    async fetchTeamWeeklySchedule(abbr) {
        await resolvePromise(getClubScheduleWeek(abbr), this.schedulePromiseState);
        if (this.schedulePromiseState.data) {
            const gamesForTeam = this.schedulePromiseState.data.games
                .map(createGame);

            // Determine the dynamic date range starting from today
            const [startDate, endDate] = getDynamicWeekDateRange();

            // Group filtered games by Swedish date, including all dates in the range
            this.teamGames[abbr] = groupGamesByDate(gamesForTeam, startDate, endDate);
        } 
        else if (this.schedulePromiseState.error) {
            console.error("Error fetching team weekly schedule: ", this.schedulePromiseState.error);
        }
    },
});

export default scheduleModel;
