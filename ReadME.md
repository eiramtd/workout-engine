## Workout - Engine 

###  **Core Workout Generation**

* [ ] **Dynamic Daily Workout Plans**
  Generates a fresh workout plan each day based on history, goals, fatigue, and recovery.

* [ ] **Custom Routine Templates**
  Users or trainers can create/save predefined workout templates for re-use.

* [ ] **Goal-based Adaptation**
  Tailors plans for goals like hypertrophy, strength, fat loss, endurance, etc.

* [ ] **Periodization Support**
  Optionally apply weekly/monthly cycles with progressive overload and deload weeks.

---

###  **User Personalization**

* [ ] **Gender-Based Exercise Logic**
  Adjusts exercises and volume recommendations based on sex-specific training needs.

* [ ] **User Preferences**
  Adapt to user likes/dislikes (e.g., no barbell squats, prefer machines, etc.).

* [ ] **Fatigue & Recovery Status Awareness**
  Integrates muscle group fatigue detection from logging history.

---

###  **Exercise Filtering & Selection**

* [ ] **Equipment Awareness**
  Only includes exercises available based on user's listed equipment (e.g., dumbbells, EZ bar, pull-up bar).

* [ ] **Muscle Group Balancing**
  Ensures even distribution across muscle groups weekly, avoids overtraining.

* [ ] **Superset / Triset Configuration**
  Can group exercises for supersets or circuits for time-efficiency.

* [ ] **Compound & Isolation Mix**
  Ensures proper balance of compound lifts and accessory movements.

---

###  **Workout Structuring Logic**

* [ ] **Warm-up vs Working Set Differentiation**
  Automatically generates warm-up sets with lower intensity/volume before main working sets.

* [ ] **Progressive Overload Handling**
  Adjusts reps/sets/weights weekly to gradually increase difficulty.

* [ ] **RPE-Driven Adjustments**
  Optionally adapts next workout based on user-reported effort (RPE per set).

* [ ] **Set/Rep/Intensity Schemes**
  Generates set-rep structures based on goal (e.g., 3x8\@70%, 4x10\@RPE8, etc.).

---

### **Data Sources (Internal APIs/DB Queries)**

* [ ] **Exercise Pool Querying**
  Pulls exercise data (name, muscles targeted, equipment, type) from shared exercise DB.

* [ ] **User Profile Parsing**
  Reads user profile (goals, equipment, gender, etc.) to influence generation logic.

* [ ] **Workout History Integration**
  Uses past performance and fatigue data to make intelligent decisions.

---

###  **Output Format**

* [ ] Structured Workout Plan JSON:

  ```json
  {
    "date": "2025-05-30",
    "goal": "hypertrophy",
    "muscleGroups": ["Chest", "Back", "Core"],
    "exercises": [
      {
        "name": "Incline Dumbbell Press",
        "sets": [
          { "type": "warmup", "reps": 12, "weight": 12.5 },
          { "type": "working", "reps": 8, "weight": 20 },
          { "type": "working", "reps": 8, "weight": 20 }
        ],
        "rest": 90,
        "rpe": 7,
        "notes": ""
      },
      ...
    ]
  }
  ```

