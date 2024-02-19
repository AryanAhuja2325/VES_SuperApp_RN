import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import styles from "./HolidayCalendar.Styles";
import Icon from "react-native-vector-icons/Ionicons";
import { black } from "../../utils/color";
import axios from "axios";

const Calendar = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  const daysInWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthsOfYear = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePreviousMonth = () => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  const handleYearChange = (index, value) => {
    setYear(parseInt(value));
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          `https://calendarific.com/api/v2/holidays?&api_key=XFsKiNAxZYPluNxsx6hmHZ5wcEdDOR2Q&country=in&year=${year}&type=national`
        );

        const holidayData = response.data.response.holidays;
        console.log(holidayData)
        setHolidays(holidayData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching holidays:', error);
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [year]);

  const renderWeekdays = () => {
    return (
      <View style={styles.weekdays}>
        {daysInWeek.map((weekday, index) => (
          <Text key={index} style={styles.weekday}>{weekday}</Text>
        ))}
      </View>
    );
  };

  const renderFestivalList = () => {
    const festivalsInMonth = holidays.filter(
      (holiday) => new Date(holiday.date.iso).getMonth() === month
    );

    return (
      <View style={styles.festivalList}>
        <Text style={styles.festivalTitle}>Festivals in {monthsOfYear[month]}</Text>
        {festivalsInMonth.map((festival, index) => (
          <View key={index} style={styles.festivalCard}>
            <Text style={styles.festivalDate}>
              {new Date(festival.date.iso).getDate()}/{month + 1}
            </Text>
            <Text style={styles.festivalName}>{festival.name}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderCalendarDays = () => {
    const totalDays = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();

    const calendarDays = Array.from({ length: totalDays }, (_, index) => index + 1);

    return (
      <View style={styles.calendarDays}>
        {Array(firstDay)
          .fill(null)
          .map((_, index) => (
            <Text key={`empty-${index}`} style={styles.emptyDay}></Text>
          ))}
        {calendarDays.map((day) => {
          const currentDate = new Date(year, month, day);

          const isHoliday = holidays.some((holiday) => {
            const holidayDate = new Date(holiday.date.iso);
            return (
              currentDate.getDate() === holidayDate.getDate() &&
              currentDate.getMonth() === holidayDate.getMonth() &&
              currentDate.getFullYear() === holidayDate.getFullYear()
            );
          });

          return (
            <Text
              key={day}
              style={[
                styles.day,
                currentDate.getDay() === 0 ? styles.sunday : null,
                isHoliday ? styles.festivalDay : null,
              ]}
            >
              {day}
            </Text>
          );
        })}
      </View>
    );
  };



  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={black} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Text style={styles.button}>
              <Icon name="md-chevron-back-circle-outline" size={28} color={black} />
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.month}>{monthsOfYear[month]}</Text>
        <ModalDropdown
          options={[
            "2000", "2001", "2002", "2003", "2004", "2005", "2006",
            "2007", "2008", "2009", "2010", "2011", "2012", "2013",
            "2014", "2015", "2016", "2017", "2018", "2019", "2020",
            "2021", "2022", "2023",
          ]}
          defaultValue={String(year)}
          onSelect={handleYearChange}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownStyle}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.button}>
              <Icon name="md-chevron-forward-circle-outline" size={28} color={black}></Icon>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flatlist}>
        {renderWeekdays()}
        {renderCalendarDays()}
        {renderFestivalList()}
      </View>
    </ScrollView>
  );
};

export default Calendar;
