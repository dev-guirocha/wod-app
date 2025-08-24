import type { Workout } from "@/types/workout";

// Esta é a nossa base de dados de treinos "mockados" (de exemplo).
// No futuro, estes dados viriam de um servidor/API.
export const mockWorkouts: Workout[] = [
  {
    id: "1",
    name: "Fran",
    type: "For Time",
    description: "21-15-9 reps for time of:\n- Thrusters (95/65 lb)\n- Pull-ups",
    estimatedDuration: 8,
    equipment: ["barbell", "pull-up bar"],
    movements: [
      { name: "Thrusters", reps: "21-15-9", videoUrl: "https://www.youtube.com/embed/s2g6q_v_G7o" },
      { name: "Pull-ups", reps: "21-15-9", videoUrl: "https://www.youtube.com/embed/a-y_G-i2F18" },
    ],
    description_scaled: "Use uma carga que se sentir confortável. Para Pull-ups, substitua por Ring Row ou Jumping Pull-ups.",
  },
  {
    id: "2",
    name: "Cindy",
    type: "AMRAP",
    description: "As Many Rounds as Possible (AMRAP) in 20 minutes of:\n- 5 Pull-ups\n- 10 Push-ups\n- 15 Air Squats",
    estimatedDuration: 20,
    equipment: ["pull-up bar"],
    movements: [
      { name: "Pull-ups", reps: "5", videoUrl: "https://www.youtube.com/embed/a-y_G-i2F18" },
      { name: "Push-ups", reps: "10", videoUrl: "https://www.youtube.com/embed/0pkjOkBqsII" },
      { name: "Air Squats", reps: "15", videoUrl: "https://www.youtube.com/embed/a-y_G-i2F18" },
    ],
    description_scaled: "Para Pull-ups, faça Ring Rows. Para Push-ups, faça com os joelhos no chão.",
  },
  {
    id: "3",
    name: "Helen",
    type: "For Time",
    description: "3 rounds for time of:\n- 400 meter run\n- 21 Kettlebell Swings (24/16 kg)\n- 12 Pull-ups",
    estimatedDuration: 15,
    equipment: ["kettlebell", "pull-up bar"],
    movements: [
        { name: "Run", reps: "400m" },
        { name: "Kettlebell Swings", reps: "21", videoUrl: "https://www.youtube.com/embed/YSxH59uh_wU" },
        { name: "Pull-ups", reps: "12", videoUrl: "https://www.youtube.com/embed/a-y_G-i2F18" },
    ],
    description_scaled: "Use um Kettlebell mais leve. Substitua Pull-ups por Ring Rows.",
  },
  {
    id: "comp-01",
    name: "Open 24.1",
    type: "For Time",
    description: "For time:\n21 dumbbell snatches, arm 1\n21 lateral burpees over dumbbell\n21 dumbbell snatches, arm 2\n21 lateral burpees over dumbbell\n15, 15, 15, 15\n9, 9, 9, 9",
    estimatedDuration: 15,
    equipment: ["dumbbell"],
    movements: [
      { name: "Dumbbell Snatches (22.5/15 kg)", reps: "21-15-9", videoUrl: "https://www.youtube.com/embed/8-5_8_D_6To" },
      { name: "Lateral Burpees Over Dumbbell", reps: "21-15-9", videoUrl: "https://www.youtube.com/embed/M0_S-d_g_pA" },
    ],
    description_scaled: "Use um peso mais leve no dumbbell e, se necessário, faça o burpee sem saltar sobre o peso (step over)."
  },
  {
    id: "comp-02",
    name: "Open 24.2",
    type: "AMRAP",
    description: "As many rounds as possible in 20 minutes of:\n- 300-meter row\n- 10 deadlifts (185/125 lb)\n- 50 double-unders",
    estimatedDuration: 20,
    equipment: ["rower", "barbell", "rope"],
    movements: [
      { name: "Row", reps: "300m" },
      { name: "Deadlifts", reps: "10", videoUrl: "https://www.youtube.com/embed/1_s_e_i_v5I" },
      { name: "Double-Unders", reps: "50", videoUrl: "https://www.youtube.com/embed/82j_Xg5_n-4" },
    ],
    description_scaled: "Reduza a carga do deadlift. Se não souber double-unders, faça o dobro de single-unders (100 reps)."
  },
  {
    id: "6",
    name: "Viagem sem Equipamento",
    type: "AMRAP",
    description: "As Many Rounds as Possible (AMRAP) in 15 minutes of:\n- 10 Burpees\n- 20 Alternating Lunges\n- 30 Sit-ups",
    estimatedDuration: 15,
    equipment: ["none"],
    movements: [
      { name: "Burpees", reps: "10", videoUrl: "https://www.youtube.com/embed/M0_S-d_g_pA" },
      { name: "Alternating Lunges", reps: "20", videoUrl: "https://www.youtube.com/embed/Z2n58m2i4jg" },
      { name: "Sit-ups", reps: "30", videoUrl: "https://www.youtube.com/embed/jO_v_p_I_zE" },
    ],
    description_scaled: "Mantenha um ritmo constante. O objetivo é não parar durante os 15 minutos."
  },
];
