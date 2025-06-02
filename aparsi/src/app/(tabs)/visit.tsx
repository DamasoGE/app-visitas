import React, { useState, useMemo } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSeller } from "../../hooks/useSeller";
import { Calendar, DateData } from "react-native-calendars";
import { primaryColor, stylesTheme } from "../../styles/theme";
import { stylesVisit } from "../../styles/visit";
import { statusConfig } from "../../helpers/utilsStatus";
import { formatDisplayDate, formatDisplayTime } from "../../helpers/utilsDate";
import { Ionicons } from "@expo/vector-icons";
import { monthNames } from "../../helpers/utilsCalendar";

// Función helper para obtener fecha "yyyy-MM-dd" en zona horaria específica sin date-fns-tz
function getDateStringInTimeZone(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date); // Ejemplo: "2025-05-29"
}

// Función helper para convertir una fecha UTC o local a fecha ajustada a zona horaria (sin date-fns-tz)
function convertToTimeZone(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const map: Record<string, string> = {};
  parts.forEach(({ type, value }) => {
    map[type] = value;
  });

  return new Date(
    `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}.000`
  );
}

export default function VisitScreen() {
  const { selectedProperty } = useSeller();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const timeZone = "Europe/Madrid";

  if (!selectedProperty) {
    return (
      <View style={stylesTheme.centeredContainer}>
        <Text style={stylesTheme.tabInfoText}>
          Selecciona una propiedad para ver sus visitas.
        </Text>
      </View>
    );
  }

  const visits = selectedProperty.visits || [];

  const visitsByDay = useMemo(() => {
    const grouped: Record<string, any[]> = {};

    visits.forEach((visit: any) => {
      const originalDate = new Date(visit.appointment);
      const localDate = convertToTimeZone(originalDate, timeZone);
      const key = getDateStringInTimeZone(originalDate, timeZone);

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(visit);
    });

    // Ordenar las visitas dentro de cada día
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort(
        (a, b) =>
          new Date(a.appointment).getTime() - new Date(b.appointment).getTime()
      );
    });

    return grouped;
  }, [visits]);

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    Object.keys(visitsByDay).forEach((date) => {
      marks[date] = { marked: true, dotColor: primaryColor };
    });
    if (selectedDate) {
      marks[selectedDate] = {
        ...marks[selectedDate],
        selected: true,
        selectedColor: primaryColor,
      };
    }
    return marks;
  }, [visitsByDay, selectedDate]);

  const openModal = (visit: any) => {
    setSelectedVisit(visit);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVisit(null);
  };

  return (
    <View style={stylesTheme.viewContainer}>
      <Text style={stylesTheme.sectionTitle}>Agenda Visitas</Text>
      <View style={stylesVisit.styledCalendar}>
        <Calendar
          markingType="dot"
          markedDates={markedDates}
          onDayPress={(day: DateData) => {
            setSelectedDate(visitsByDay[day.dateString] ? day.dateString : null);
          }}
          firstDay={1}
          monthFormat={"MMMM yyyy"}
        />
      </View>

      <View style={stylesTheme.flex1Container}>
        {!selectedDate ? (
          <View style={stylesTheme.centeredContainer}>
            <Text style={stylesTheme.tabInfoText}>
              Selecciona un día con visitas.
            </Text>
          </View>
        ) : visitsByDay[selectedDate]?.length === 0 ? (
          <Text style={stylesTheme.tabInfoText}>
            No hay visitas para este día.
          </Text>
        ) : (
          <View style={stylesTheme.flex1Container}>
            <Text style={stylesTheme.sectionTitle}>
              {selectedDate
                ? (() => {
                    const date = new Date(selectedDate);
                    const day = String(date.getDate()).padStart(2, "0");
                    const monthName = monthNames[date.getMonth()];
                    const year = date.getFullYear();
                    return `${day} de ${monthName} de ${year}`;
                  })()
                : ""}
            </Text>
            <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
              <View style={stylesTheme.visitCardGrid}>
                {visitsByDay[selectedDate].map((item) => {
                  const cfg = statusConfig[item.status] || {
                    label: "Desconocido",
                    color: "#6C757D",
                  };
                  return (
                    <View style={stylesTheme.visitCardWrapper} key={item._id}>
                      <TouchableOpacity
                        style={[stylesTheme.visitCard, { backgroundColor: cfg.color }]}
                        onPress={() => openModal(item)}
                        activeOpacity={0.7}
                      >
                        <View style={stylesTheme.visitCardStatusBadge}>
                          <Text style={stylesTheme.visitCardStatusBadgeText}>
                            {cfg.label}
                          </Text>
                        </View>

                        <View style={stylesTheme.iconTextRow}>
                          <Ionicons name="time-outline" size={20} color={"white"} />
                          <Text style={stylesTheme.visitCardTime}>
                            <Text>{" "}{formatDisplayTime(new Date(item.appointment))}</Text>
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        )}
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={stylesTheme.modalOverlay} onPress={closeModal}>
          <View style={stylesTheme.modalBox}>
            {selectedVisit && (
              <>
                <Text style={stylesTheme.modalTitle}>Detalles de Visita</Text>

                <Text
                  style={[
                    stylesTheme.modalStatusText,
                    { color: statusConfig[selectedVisit.status]?.color },
                  ]}
                >
                  {statusConfig[selectedVisit.status]?.label}
                </Text>

                <View style={stylesTheme.iconTextRow}>
                  <Ionicons name="calendar-number-outline" size={20} />
                  <Text style={stylesTheme.modalText}>
                    {formatDisplayDate(new Date(selectedVisit.appointment))}
                  </Text>
                </View>

                <View style={stylesTheme.iconTextRow}>
                  <Ionicons name="time-outline" size={20} />
                  <Text style={stylesTheme.modalText}>
                    {formatDisplayTime(new Date(selectedVisit.appointment))}
                  </Text>
                </View>

                <View style={stylesTheme.iconTextRow}>
                  {selectedVisit.comment && (
                    <>
                      <Ionicons name="chatbubble-ellipses-outline" size={20} />
                      <Text style={stylesTheme.modalText}>{selectedVisit.comment}</Text>
                    </>
                  )}
                </View>
                <Pressable
                  style={stylesTheme.modalCloseButton}
                  onPress={closeModal}
                >
                  <Text style={stylesTheme.modalCloseButtonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
