import React, { useState, useMemo } from "react";
import { ScrollView, Modal, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useSeller } from "../../hooks/useSeller";
import { stylesTheme } from "../../styles/theme";
import { stylesHome } from "../../styles/home";
import {
  formatDisplayDate,
  formatDisplayTime,
  getWeekRange,
} from "../../helpers/utilsDate";
import { statusConfig } from "../../helpers/utilsStatus";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { selectedProperty } = useSeller();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);

  const visits = selectedProperty?.visits ?? [];
  const { monday, sunday } = getWeekRange();

  const weeklyVisits = useMemo(
    () =>
      visits.filter((v) => {
        const d = new Date(v.appointment);
        return d >= monday && d <= sunday;
      }),
    [visits, monday, sunday]
  );

  const visitsByDay = useMemo(() => {
  const map: Record<string, { dateString: string; visits: typeof weeklyVisits }> = {};

  weeklyVisits.forEach((visit) => {
    const date = new Date(visit.appointment);
    const key = date.toLocaleDateString("es-ES", { timeZone: "Europe/Madrid" }); // p. ej. "25/05/2025"

    if (!map[key]) {
      map[key] = { dateString: key, visits: [] };
    }

    map[key].visits.push(visit);
  });

  return map;
}, [weeklyVisits]);

const sortedDays = useMemo(() => {
  return Object.entries(visitsByDay)
    .sort(
      ([a], [b]) =>
        new Date(a.split("/").reverse().join("-")).getTime() -
        new Date(b.split("/").reverse().join("-")).getTime()
    )
    .map(([key, group]) => ({
      dateString: key,
      date: new Date(key.split("/").reverse().join("-")),
      visits: group.visits,
    }));
}, [visitsByDay]);

  if (!selectedProperty) {
    return (
      <View style={stylesTheme.centeredContainer}>
        <Text style={stylesTheme.tabInfoText}>Selecciona una propiedad para ver su semana.</Text>
      </View>
    );
  }

  const openModal = (visit: any) => {
    setSelectedVisit(visit);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelectedVisit(null);
  };

  const stats = [
    {
      key: "timesOffered",
      label: "Ofrecida",
      value: selectedProperty.timesOffered,
    },
    {
      key: "timesListed",
      label: "Listada",
      value: selectedProperty.timesListed,
    },
    {
      key: "timesVisited",
      label: "Visitada",
      value: selectedProperty.timesVisited,
    },
    {
      key: "timesInterested",
      label: "Interesados",
      value: selectedProperty.timesInterested,
    },
    {
      key: "timesDetailView",
      label: "Detalle",
      value: selectedProperty.timesDetailView,
    },
  ];

  return (
    <View style={stylesTheme.viewContainer}>
      <ScrollView>
        <Text style={stylesTheme.sectionTitle}>Estadísticas</Text>
        <ScrollView style={stylesHome.statsScroll} horizontal showsHorizontalScrollIndicator={false}>
          {stats.map(({ key, label, value }) => (
            <View style={stylesHome.statCard} key={key}>
              <Text style={stylesHome.statValue}>{value ?? 0}</Text>
              <Text style={stylesHome.statLabel}>{label}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={stylesTheme.sectionTitle}>Visitas de la semana</Text>
        {sortedDays.length === 0 ? (
          <View style={stylesTheme.centeredContainer}>
            <Text style={stylesTheme.tabInfoText}>Sin visitas esta semana.</Text>
          </View>
        ) : (
          sortedDays.map(({ date, visits }) => (
            <View style={stylesHome.daySection} key={date.toISOString()}>
              <Text style={stylesHome.dayHeader}>{formatDisplayDate(date)}</Text>
              <ScrollView style={stylesHome.visitsScroll}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {visits
                  .sort(
                    (a, b) =>
                      new Date(a.appointment).getTime() -
                      new Date(b.appointment).getTime()
                  )
                  .map((visit) => {
                    const cfg = statusConfig[visit.status] || {
                      label: visit.status,
                      color: "#374151",
                    };
                    return (
                      <TouchableOpacity
                        style={[stylesTheme.visitCard, { backgroundColor: cfg.color }]}
                        key={visit._id}
                        onPress={() => openModal(visit)}
                        activeOpacity={0.7}
                      >
                        <View style={stylesTheme.visitCardStatusBadge}>
                          <Text style={stylesTheme.visitCardStatusBadgeText}>
                            {cfg.label}
                          </Text>
                        </View>

                        <View style={stylesTheme.iconTextRow}>
                          <Ionicons
                            name="time-outline"
                            size={20}
                            color={"white"}
                          />
                          <Text style={stylesTheme.visitCardTime}>
                            <Text>
                              {" "}
                              {formatDisplayTime(new Date(visit.appointment))}
                            </Text>
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          ))
        )}

        <Modal visible={modalVisible} transparent animationType="fade">
          <Pressable style={stylesTheme.modalOverlay} onPress={closeModal}>
            <View style={stylesTheme.modalBox}>
              {selectedVisit && (
                <>
                  <Text style={stylesTheme.modalTitle}>Detalles de Visita</Text>

                  <Text
                    style={[stylesTheme.modalStatusText, { color: statusConfig[selectedVisit.status]?.color }]}
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
                        <Ionicons
                          name="chatbubble-ellipses-outline"
                          size={20}
                        />
                        <Text style={stylesTheme.modalText}>{selectedVisit.comment}</Text>
                      </>
                    )}
                  </View>
                  <Pressable style={stylesTheme.modalCloseButton} onPress={closeModal}>
                    <Text style={stylesTheme.modalCloseButtonText}>Cerrar</Text>
                  </Pressable>
                </>
              )}
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    </View>
  );
}
