export default function useDate() {

    const getCurrentDay = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;

        const formattedDay = (day < 10) ? '0' + day : day;
        const formattedMonth = (month < 10) ? '0' + month : month;

        const formattedDate = `${formattedDay}.${formattedMonth}`;

        return formattedDate;
    }

    return { getCurrentDay };
}