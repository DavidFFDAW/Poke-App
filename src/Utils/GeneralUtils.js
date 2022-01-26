import { types } from "../constants/types.data";

export const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
}

export const getTypeColor = (type) => {
    const typeBg = types[type];

    if (!typeBg) {
        return null;
    }

    return {
        bg: '#' + typeBg.bg.split('#')[1].replace(',','').split(' ')[0],
        border: typeBg.bg.split(',')[1].replace(')','').split(' ')[0],
    }
};

export const parseChartStatistics = (stats, pokeName, color = { bg: '#dea9b1', border: 'dea9c6' }) => {
    const parsedStats = stats.map((it) => ({
        name: it.stat.name,
        base_stat: it.base_stat,
        effort: it.effort
    }));

    const statNumbers = Object.values(parsedStats).map(stat => stat.base_stat);

    var data = [{
        label: `${pokeName} stats`,
        data: statNumbers,
        backgroundColor: color.bg,                  
        borderColor: color.border,
    }];

    return { 
        labels: Object.values(parsedStats).map(stat => 
            stat.name.toUpperCase()
        ),
        datasets: data,
    }
}