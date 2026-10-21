# Smart Telemetry Keyfob — Implementation Task List & Work Breakdown Structure (WBS)

This document breaks down the [Master Architecture Plan](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/remote_keyfob_architecture_plan.md) into actionable, granular development tasks. Each task includes target source files, technical specifications, priority ratings, dependencies, and acceptance criteria.

---

## Progress Overview & Milestone Tracker

| Phase | Milestone Name | Tasks | Status | Target Timeline |
| :---: | :--- | :---: | :---: | :---: |
| **Phase 1** | Hardware Bring-Up & Low-Level Drivers | 6 Tasks | ✅ Completed | Days 1–3 |
| **Phase 2** | LVGL 8.4 UI/UX Framework & 17 Screen Views | 18 Tasks | ✅ Completed | Days 4–7 |
| **Phase 3** | 4-Button Input Engine & Configuration Subsystem | 5 Tasks | ✅ Completed | Days 8–10 |
| **Phase 4** | Dual-Wireless Stack, LoRa Gateway & BLE HID | 7 Tasks | ✅ Completed | Days 11–15 |
| **Phase 5** | Telemetry, Distance Radar & Motorsport Analytics | 5 Tasks | ✅ Completed | Days 16–19 |
| **Phase 6** | Safety Systems, Crash e-Call & Anti-Theft Hunter | 4 Tasks | ✅ Completed | Days 20–22 |
| **Phase 7** | Smartphone Synergy, Apple ANCS & BLE OTA Engine | 8 Tasks | ✅ Completed | Days 23–26 |
| **Phase 8** | Power Management, Deep-Sleep Tuning & Battery ADC | 4 Tasks | ✅ Completed | Days 27–29 |
| **Phase 9** | System Integration, Enclosure Fitting & RF Field Tests | 4 Tasks | 🔲 Pending | Days 30–32 |
| **Total** | **End-to-End Keyfob Firmware & UI/UX** | **61 Tasks** | **93% Completed (57/61)** | **32 Days** |

---

## Phase 1: Hardware Bring-Up & Low-Level Drivers (Days 1–3)

- [x] **TASK-HW-01: Update PlatformIO Build Configuration & Dual-OTA Partition Table**
  - **Priority**: P0 (Blocker)
  - **Target Files**:
    - [platformio.ini](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/platformio.ini)
    - [partitions_two_ota.csv](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/partitions_two_ota.csv)
  - **Description**: Configure PlatformIO for ESP32-C3 DevKitM-1 with 4MB Flash. Create custom `partitions_two_ota.csv` with `bootloader` (32KB), `partitions` (4KB), `ota_0` (1,856KB), `ota_1` (1,856KB), and `nvs` (256KB). Define build flags for USB CDC on boot, LovyanGFX, and LVGL simple headers.
  - **Acceptance Criteria**: Project compiles cleanly; `pio run -t size` confirms dual-OTA flash partition layout.

- [x] **TASK-HW-02: Align Pinout Configuration with Master Architecture**
  - **Priority**: P0 (Blocker)
  - **Target Files**:
    - [include/pinout_config.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/pinout_config.h)
  - **Description**: Update pin assignments to eliminate capacitive touch definitions and set definitive pins:
    - Display SPI: `LCD_SCK` (GPIO 4), `LCD_MOSI` (GPIO 6), `LCD_CS` (GPIO 7), `LCD_DC` (GPIO 5), `LCD_BL` (GPIO 1).
    - LoRa SX1262: `LORA_SCK` (GPIO 4), `LORA_MOSI` (GPIO 6), `LORA_MISO` (GPIO 2), `LORA_CS` (GPIO 10), `LORA_DIO1` (GPIO 0), `LORA_BUSY` (GPIO 20), `LORA_RST` (GPIO 21).
    - Buttons: `BTN_1` (GPIO 12), `BTN_2` (GPIO 13), `BTN_3` (GPIO 14), `BTN_4` (GPIO 15).
    - Status RGB LED: `PIN_RGB_LED` (GPIO 8).
    - Battery Sense: `PIN_VBAT_ADC` (GPIO 3).
  - **Acceptance Criteria**: Header defines compile without GPIO conflicts or strapping pin violations.

- [x] **TASK-HW-03: Implement LovyanGFX ST7789V2 Driver with 20-Row Framebuffer Offset**
  - **Priority**: P0 (Blocker)
  - **Target Files**:
    - [include/display_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/display_manager.h)
    - [src/display_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/display_manager.cpp)
  - **Description**: Configure LovyanGFX SPI master bus at 40 MHz with DMA. Implement panel setup for $240 \times 280$ physical resolution on the ST7789V2 $240 \times 320$ controller RAM with `offset_x = 0` and `offset_y = 20`.
  - **Acceptance Criteria**: Test patterns render edge-to-edge without graphic clipping or shifting at top/bottom rows.

- [x] **TASK-HW-04: Implement LEDC PWM Backlight Brightness Controller**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/display_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/display_manager.cpp)
  - **Description**: Set up ESP32 LEDC PWM timer channel on `PIN_LCD_BL` (GPIO 1) running at 20 kHz (inaudible frequency). Implement linear and logarithmic brightness scaling functions ($0\% - 100\%$) with smooth fade transitions.
  - **Acceptance Criteria**: Backlight fades smoothly between 10% and 100% duty cycle without visible flicker or audible coil whine.

- [x] **TASK-HW-05: Implement 4-Button Hardware ISRs & RTC GPIO Wakeup**
  - **Priority**: P0 (Blocker)
  - **Target Files**:
    - [include/input_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/input_manager.h)
    - [src/input_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/input_manager.cpp)
  - **Description**: Configure GPIOs 12, 13, 14, 15 with internal pull-ups (`INPUT_PULLUP`). Attach falling-edge interrupts. Register pins with `esp_deep_sleep_enable_gpio_wakeup` for instant deep sleep wake.
  - **Acceptance Criteria**: Pressing any button logs an instant interrupt event with $< 5\text{ ms}$ response.

- [x] **TASK-HW-06: Implement WS2812B RGB Status LED & Battery ADC Reader**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [include/pinout_config.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/pinout_config.h)
    - [src/main.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/main.cpp)
  - **Description**: Initialize FastLED or RMT driver on GPIO 8 for the single WS2812B NeoPixel. Implement non-blocking animation states (Pulse Blue for BLE connect, Red Strobe for alarm, Police Red/Blue for Find My). Configure ADC1 Channel 3 (GPIO 3) with attenuation to read the 100k/100k voltage divider.
  - **Acceptance Criteria**: LED executes smooth non-blocking blink patterns; ADC accurately calculates battery millivolts against digital multimeter measurements.

---

## Phase 2: LVGL UI/UX Framework & 17 Screen Views (Days 4–7)

- [x] **TASK-UI-01: Initialize LVGL 8.4 Engine with DMA Double-Buffering**
  - **Priority**: P0 (Blocker)
  - **Target Files**:
    - [src/display_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/display_manager.cpp)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Initialize LVGL 8.4 with dual 20-line DMA draw buffers in SRAM (`disp_buf1` and `disp_buf2`). Connect `disp_drv.flush_cb` directly to LovyanGFX DMA push. Register FreeRTOS timer or periodic task to call `lv_timer_handler()` every 5 ms.
  - **Acceptance Criteria**: Frame rendering benchmarks maintain steady 35–45 FPS during gauge animations without tearing.

- [x] **TASK-UI-02: Implement Non-Touch Modal Softkey Engine**
  - **Priority**: P0 (Blocker)
  - **Target Files**:
    - [include/ui_views.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/ui_views.h)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Create a persistent bottom softkey bar widget rendering 4 dynamic action labels corresponding to Buttons 1..4. Support primary operating mode and modal menu navigation mode (`[▲ Up] [▼ Down] [✔ Select] [◄ Back]`).
  - **Acceptance Criteria**: Long-pressing Button 4 toggles modal navigation mode, dynamically transforming the softkey labels with smooth slide transitions.

- [x] **TASK-UI-03: Construct Screen 1 — Live OBD-II Telemetry Dashboard**
  - **Priority**: P0 (Core)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Build 270° arc tachometer (0–12k RPM) with color gradients, large 46pt digital speed readout (`KM/H`), gear pill indicator (`[ N ]` / `[ 4 ]`), coolant temperature, battery voltage, and live connection/distance badge (`[ ⚡ 2.8m ]`).
  - **Acceptance Criteria**: Gauge arc sweeps smoothly at 20 Hz without flickering.

- [x] **TASK-UI-04: Construct Screen 1B — Motorsport, Drag Strip & Lean Angle HUD**
  - **Priority**: P1 (High)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Build curved dynamic lean angle bubble level with peak memory markers (`◄ 38° | 0° | 42° ►`), 0–60 / 0–100 km/h acceleration sprint timer with PB indicator, 8-segment F1 shift pip bar, and front/rear TPMS pressure tiles.
  - **Acceptance Criteria**: Lean angle bubble tracks IMU roll in real time; drag sprint timer triggers on speed > 0.

- [x] **TASK-UI-05: Construct Screen 2 — Vehicle Control & Remote Hub**
  - **Priority**: P0 (Core)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Center vector motorcycle silhouette with glowing security ring (Cyan pulse = Disarmed, Red solid = Armed). Render live distance badge and 4 configurable action cards (`[1] 🔒 Lock`, `[2] 🔓 Unlock`, `[3] ⚡ Crank`, `[4] 🧰 Trunk`). Implement 1.5s radial hold arc for remote start safety.
  - **Acceptance Criteria**: Action cards reflect current NVS button mappings; hold arc fills clockwise during long-press.

- [x] **TASK-UI-06: Construct Screen 3 — OBD-II Diagnostics & DTC Monitor**
  - **Priority**: P1 (High)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Diagnostic Trouble Code list view displaying standard SAE codes and descriptions (e.g. `P0118`). Display large green shield icon when 0 DTCs are active. Implement hold Button 3 trigger to clear codes.
  - **Acceptance Criteria**: Correctly lists active and historic fault codes fetched over BLE/LoRa.

- [x] **TASK-UI-07: Construct Screen 4 — On-Device Settings & Button Remapping Menu**
  - **Priority**: P0 (Core)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Scrollable menu list allowing selection of Button 1..4, trigger type (Short, Double, Long), and action from the 28-action registry with live preview. Include sliders for display brightness ($10\% - 100\%$) and sleep timeout ($5\text{s}, 15\text{s}, 30\text{s}, 60\text{s}$).
  - **Acceptance Criteria**: Full configuration workflow operates seamlessly using only the 4 physical buttons without touchscreen.

- [x] **TASK-UI-08: Construct Screen 5 — Directional "Find My Bike" Radar & LoRa Signal Hunter**
  - **Priority**: P1 (High)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Rotating cardinal compass needle pointing toward parked bike GPS vector. Display exact distance (near-zone meters or far-zone km). Implement underground RSSI "Geiger counter" signal strength bar for GPS-denied environments.
  - **Acceptance Criteria**: Compass needle rotates dynamically based on bearing; RSSI bar updates on every LoRa packet.

- [x] **TASK-UI-09: Construct Screen 6 — Post-Ride "Black Box" Analytics Summary**
  - **Priority**: P2 (Medium)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Journey scorecard showing Trip Distance (km), Duration, Peak Speed, Average Speed, Max Lean angles (L/R), Fuel Consumed, and Starter Cranking Minimum Voltage drop.
  - **Acceptance Criteria**: Renders ride summary metrics cached in NVS on engine shutdown.

- [x] **TASK-UI-10: Construct Screen 7 — Crash Alert & Emergency SOS Countdown**
  - **Priority**: P0 (Safety)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: High-visibility flashing red emergency banner, 30-second abort progress bar, GPS location readouts, and cancel button.
  - **Acceptance Criteria**: Automatically triggers when crash impact is received; pressing Button 4 aborts countdown before LoRa SOS broadcast.

- [x] **TASK-UI-11: Construct Screen 8 — Bluetooth Media & Helmet Audio Controller**
  - **Priority**: P1 (High)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Media view with scrolling track title, artist name, playback status icon, volume arc, and quick control indicators (Vol Up/Down, Play/Pause, Next Track).
  - **Acceptance Criteria**: Text auto-scrolls for long song titles; volume arc responds instantly to button presses.

- [x] **TASK-UI-12: Construct Screen 9 — Turn-by-Turn Mini-Navigation HUD & Speed Camera Alert**
  - **Priority**: P1 (High)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Navigation display with high-contrast maneuver arrows (Straight, Left, Right, Roundabout), distance countdown to turn, street name, and speed camera early warning pill (`Camera in: 350m`).
  - **Acceptance Criteria**: Displays maneuver icons and countdowns received from companion phone app over BLE.

- [x] **TASK-UI-13: Construct Screen 10 — Ambient Weather, Altimeter & Road Ice Warning**
  - **Priority**: P2 (Medium)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Current elevation above sea level, 3-hour barometric pressure trend graph, ambient temperature, and glowing blue snowflake black ice warning when temp $< 3^\circ\text{C}$.
  - **Acceptance Criteria**: Visual ice warning displays when temperature conditions are met.

- [x] **TASK-UI-14: Construct Screen 11 — Group Ride LoRa P2P Quick-Messaging**
  - **Priority**: P2 (Medium)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Canned messaging interface allowing one-click dispatch of quick messages (*"Need Gas"*, *"Regroup"*, *"Hazard Ahead"*, *"Mechanical Stop"*). Incoming message banner showing sender callsign, message code, and distance.
  - **Acceptance Criteria**: Incoming LoRa message interrupts screen with audio/vibration and displays sender details.

- [x] **TASK-UI-15: Construct Screen 12 — Multi-Bike Fleet Profile Switcher**
  - **Priority**: P2 (Medium)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Profile switcher cards for up to 3 paired bikes showing bike model, connection status, and battery level.
  - **Acceptance Criteria**: Selecting a bike loads the respective rolling encryption keys and LoRa node IDs.

- [x] **TASK-UI-16: Construct Screen 13 — Emergency Full-White Flashlight Torch**
  - **Priority**: P2 (Medium)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Sets all $240 \times 280$ pixels to solid `#FFFFFF` with 100% backlight PWM duty cycle.
  - **Acceptance Criteria**: Instantly toggles max white illumination on single action click; any button press turns it off.

- [x] **TASK-UI-17: Construct Screen 14A/14B — Bi-Directional "Find My" Utility Screens**
  - **Priority**: P1 (High)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**:
    - Screen 14A: Full-screen flashing white strobe with "KEYFOB LOCATOR ACTIVE" banner when triggered from phone.
    - Screen 14B: "FIND MY PHONE" screen rendering phone name, max volume alarm status, and live BLE RSSI signal bars (`-62 dBm (~6m)`).
  - **Acceptance Criteria**: Screen 14A pulses screen and LED until dismissed; Screen 14B updates live RSSI bars every 500ms.

- [x] **TASK-UI-18: Construct Screen 15 (BLE OTA), Screen 16 (Virtual Leash) & Screen 17 (Caller ID)**
  - **Priority**: P0 (Core)
  - **Target Files**: [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**:
    - Screen 15: BLE OTA firmware upgrade HUD with dual-partition progress bar, speed (KB/s), and time remaining.
    - Screen 16: "Virtual Leash" separation alert warning that phone or keyfob was left behind ($> 15\text{m}$).
    - Screen 17: Incoming Caller ID modal pop-up with contact name, VIP priority badge, and button actions to answer or send canned "Riding" SMS.
  - **Acceptance Criteria**: All three screens integrate into the modal overlay hierarchy without interfering with background tasks.

---

## Phase 3: 4-Button Input Engine & Configuration Subsystem (Days 8–10)

- [x] **TASK-INP-01: Implement 4-Button Multi-Click Finite State Machine**
  - **Priority**: P0 (Blocker)
  - **Target Files**:
    - [include/input_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/input_manager.h)
    - [src/input_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/input_manager.cpp)
  - **Description**: Build debounced button state machine detecting:
    1. Short Click ($< 400\text{ ms}$)
    2. Double Click ($< 300\text{ ms}$ interval)
    3. Long Press ($> 1200\text{ ms}$)
    4. Button combinations (e.g. Button 1 + Button 3 for Find My Phone).
  - **Acceptance Criteria**: Accurately classifies all 4 gesture types without false triggers or bounce artifacts.

- [x] **TASK-INP-02: Implement Action Registry & Dispatcher**
  - **Priority**: P0 (Blocker)
  - **Target Files**:
    - [include/config_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/config_manager.h)
    - [src/config_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/config_manager.cpp)
  - **Description**: Implement enumeration and callback dispatcher for all 28 actions (`ACTION_LOCK_ARM`, `ACTION_UNLOCK_DISARM`, `ACTION_REMOTE_START`, `ACTION_KILL_SWITCH`, `ACTION_FIND_MY_PHONE`, etc.).
  - **Acceptance Criteria**: Calling `dispatchAction(action_id)` executes the correct subsystem callback.

- [x] **TASK-INP-03: Implement Persistent Flash NVS Storage (`ConfigManager`)**
  - **Priority**: P0 (Core)
  - **Target Files**:
    - [include/config_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/config_manager.h)
    - [src/config_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/config_manager.cpp)
  - **Description**: Use ESP32 `Preferences` library to store:
    - 4x3 Button Action Mapping Table
    - Active UI theme, brightness level, and sleep timeout
    - Paired motorcycle IDs and cryptographic rolling codes
    - Multi-bike profile configurations
  - **Acceptance Criteria**: Mappings survive power cycle; invalid flash data automatically resets to factory defaults.

- [x] **TASK-INP-04: Implement On-Device Softkey Remapping Workflow**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/input_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/input_manager.cpp)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Connect the modal softkey router (`[▲ Up] [▼ Down] [✔ Select] [◄ Back]`) to Screen 4. Allow user to navigate to a button, change its trigger action, see an instant preview, and save to NVS.
  - **Acceptance Criteria**: User can remap any button action directly on the device within 15 seconds without using a smartphone.

- [x] **TASK-INP-05: Implement Remote Start Safety Hold Verification**
  - **Priority**: P0 (Safety)
  - **Target Files**:
    - [src/input_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/input_manager.cpp)
  - **Description**: Require a continuous 1.5-second hold for `ACTION_REMOTE_START`. Update the radial progress indicator on Screen 2 in real time. If the button is released before 1.5s, cancel the command immediately.
  - **Acceptance Criteria**: Prevents accidental engine cranking; starter trigger fires only after continuous 1.5s hold.

---

## Phase 4: Dual-Wireless Protocol Stack, LoRa Gateway & BLE HID (Days 11–15)

- [x] **TASK-RF-01: Prototype Antenna RF Isolation & Bench S-Parameter Testing**
  - **Priority**: P0 (Hardware Validation)
  - **Target Files**: Hardware test bench
  - **Description**: Measure prototype PCB S-parameters with Vector Network Analyzer (VNA). Verify that center-to-center spacing ($\ge 28\text{ mm}$) and $90^\circ$ cross-polarization ($H$-pol BLE vs $V$-pol LoRa) provide $> 25\text{ dB}$ of path isolation ($S_{21} < -25\text{ dB}$) between 2.4 GHz and 868/915 MHz. Verify display SPI clock $880\text{ MHz}$ harmonic suppression via $22\,\Omega$ damping resistors.
  - **Acceptance Criteria**: BLE transmissions cause $< 1\text{ dB}$ degradation in SX1262 LoRa receiver noise floor.

- [x] **TASK-RF-02: Implement NimBLE Central Mode (20Hz OBD Stream from VCU)**
  - **Priority**: P0 (Core)
  - **Target Files**:
    - [include/ble_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/ble_manager.h)
    - [src/ble_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ble_manager.cpp)
  - **Description**: Use NimBLE-Arduino to scan for motorcycle VCU advertising service UUID. Auto-connect when RSSI $\ge -85\text{ dBm}$. Subscribe to Nordic UART Service (NUS) TX characteristic and parse incoming 20-byte packed `TelemetryFrame` packets at 10–20 Hz.
  - **Acceptance Criteria**: Maintains reliable 20 Hz telemetry streaming with $< 25\text{ ms}$ latency when within 10 meters.

- [x] **TASK-RF-03: Implement RadioLib SX1262 Sub-GHz LoRa Driver with Rolling Codes**
  - **Priority**: P0 (Core)
  - **Target Files**:
    - [include/lora_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/lora_manager.h)
    - [src/lora_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/lora_manager.cpp)
  - **Description**: Initialize SX1262 via RadioLib (868/915 MHz, BW 250 kHz, SF7, CR 4/5, $+14\text{ dBm}$). Implement packet framing with 32-bit monotonically increasing counter and HMAC authentication to prevent replay attacks.
  - **Acceptance Criteria**: Reliable packet exchange between Keyfob and VCU up to 1.5 km line-of-sight; rejected packets if rolling counter is replayed.

- [x] **TASK-RF-04: Implement Wireless Arbitration State Machine (`WirelessArbiter`)**
  - **Priority**: P0 (Core)
  - **Target Files**:
    - [include/wireless_arbiter.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/wireless_arbiter.h)
    - [src/wireless_arbiter.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/wireless_arbiter.cpp)
  - **Description**: Implement state machine managing transitions:
    - `BLE_CONNECTED`: Primary high-rate 20 Hz OBD telemetry.
    - If 3 consecutive BLE keepalives fail or RSSI drops below $-90\text{ dBm}$, smoothly failover to `LORA_FALLBACK`.
    - `LORA_FALLBACK`: Switch to on-demand polling or 3-second heartbeat pings.
    - Reconnect to BLE automatically when advertising is re-detected.
  - **Acceptance Criteria**: Screen UI transitions seamlessly between `[ BLE ⚡ Connected ]` and `[ LoRa 📡 -84dBm ]` without locking the UI thread.

- [x] **TASK-RF-05: Implement LoRa-to-BLE Gateway Bridge Subsystem**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/ble_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ble_manager.cpp)
    - [src/lora_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/lora_manager.cpp)
  - **Description**: Bridge smartphone app commands to the motorcycle over LoRa:
    - Smartphone app sends `LoRaBridgeCommandPacket` to Keyfob over BLE.
    - Keyfob repackages command into LoRa packet and transmits to bike up to 1.5 km away.
    - Keyfob receives LoRa ACK from bike and forwards status back to phone app over BLE.
  - **Acceptance Criteria**: Smartphone controls bike locks and checks battery status from 1 km distance through the keyfob gateway.

- [x] **TASK-RF-06: Implement BLE HID Consumer Profile (Helmet & Camera Remote)**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/ble_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ble_manager.cpp)
  - **Description**: Implement BLE HID Consumer Control reports exposing standard keys:
    - Volume Up / Volume Down
    - Play / Pause / Call Answer
    - Track Next / Previous
    - Camera Shutter (take photo or trigger GoPro/Insta360 recording)
  - **Acceptance Criteria**: Paired phone/Cardo headset reacts instantly to media button presses on Screen 8.

- [x] **TASK-RF-07: Implement Mobile Companion Configuration GATT Service**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/ble_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ble_manager.cpp)
  - **Description**: Expose secondary GATT Service (`KeyfobConfigService`) with characteristics for:
    - Reading/writing 4-button mapping table
    - Setting UI themes and screen timeout
    - Streaming post-ride trip logs (`RideSummaryLogPacket`)
  - **Acceptance Criteria**: Companion app reads and writes complete configuration table in $< 500\text{ ms}$.

---

## Phase 5: Telemetry, Distance Radar & Motorsport Analytics (Days 16–19)

- [x] **TASK-TEL-01: Implement Dual-Zone Live Distance Estimation Engine**
  - **Priority**: P0 (Core)
  - **Target Files**:
    - [include/distance_estimator.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/distance_estimator.h)
    - [src/distance_estimator.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/distance_estimator.cpp)
  - **Description**:
    - **Near Zone ($0-20\text{m}$)**: Log-Distance Path Loss equation:
      $$d = 10^{\left(\frac{\text{RSSI}_{1\text{m}} - \text{RSSI}_{\text{measured}}}{10 \cdot n}\right)}$$
      using calibrated $\text{RSSI}_{1\text{m}} = -59\text{ dBm}$ and environmental path loss exponent $n = 2.6$.
    - **1-D Kalman Filter**: Implement `RSSIKalmanFilter` ($Q=0.05, R=2.0$) to smooth RSSI fluctuations caused by body shadowing.
    - **Far Zone ($20\text{m}-2.5\text{km}$)**: Haversine geodesic calculation from VCU GPS fix to determine meter distance and cardinal compass heading.
    - **Underground Mode**: Map SX1262 LoRa RSSI/SNR into proximity bands ($<50\text{m}$, $50-250\text{m}$, $250-800\text{m}$, $>800\text{m}$).
  - **Acceptance Criteria**: Status bar renders stable meter distance (`[ ⚡ Bike: 2.8m ]`) without jumping; far-field compass needle correctly points toward parked bike.

- [x] **TASK-TEL-02: Implement 0-60 / 0-100 km/h Motorsport Acceleration Timer**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/main.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/main.cpp)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: State machine on Screen 1B:
    - Arm sprint timer when stationary (`speed == 0`).
    - Start high-resolution FreeRTOS timer on throttle tip-in (`throttle > 5%` or `speed > 1 km/h`).
    - Capture split times at $60.0\text{ km/h}$ and $100.0\text{ km/h}$.
    - Save personal best (PB) times to NVS flash.
  - **Acceptance Criteria**: Timer triggers accurately with $10\text{ ms}$ resolution; captures and displays run time on Screen 1B.

- [x] **TASK-TEL-03: Implement Peak Lean Angle & G-Force Memory Engine**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Sample roll angle and lateral accelerometer data from VCU telemetry. Filter sensor noise and record session peak left and peak right bank angles. Retain peak markers on Screen 1B bubble level until reset.
  - **Acceptance Criteria**: Peak markers update only when a deeper lean angle is achieved; resets on trip clear.

- [x] **TASK-TEL-04: Implement 60-Second Black Box Pre-Crash Circular Buffer**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/main.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/main.cpp)
  - **Description**: Maintain circular RAM ring buffer storing 1,200 telemetry frames (60 seconds @ 20 Hz: Speed, RPM, Throttle, Brake, Lean, G-Forces). When impact or crash flag is received, immediately freeze buffer and write to SPI flash for insurance/diagnostic export.
  - **Acceptance Criteria**: Freezes buffer instantly upon crash trigger; dumps full 60s record over BLE GATT to companion app.

- [x] **TASK-TEL-05: Implement Cockpit Handlebar Dock Auto-Detection**
  - **Priority**: P2 (Medium)
  - **Target Files**:
    - [src/main.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/main.cpp)
  - **Description**: Detect dock insertion via charging 5V presence or magnetic reed switch. Automatically switch active screen to Screen 1 (Live Cluster) or Screen 1B (Motorsport HUD), maximize backlight to 100%, and disable auto-sleep timeouts while docked.
  - **Acceptance Criteria**: Keyfob switches automatically to cockpit HUD mode when placed on handlebar mount and stays illuminated.

---

## Phase 6: Safety Systems, Crash Response & Anti-Theft Hunter (Days 20–22)

- [x] **TASK-SAF-01: Implement Crash Detection e-Call State Machine with 30s Abort Timer**
  - **Priority**: P0 (Safety)
  - **Target Files**:
    - [include/safety_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/safety_manager.h)
    - [src/safety_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/safety_manager.cpp)
    - [src/main.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/main.cpp)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: When VCU signals severe crash ($>4.5\text{G}$ deceleration + bike tilt $>70^\circ$ for $>3\text{s}$):
    - Keyfob interrupts display, jumps to Screen 7, and sounds continuous buzzer.
    - Initiates 30-second abort countdown with visual progress bar.
    - If Button 4 is pressed, abort sequence and resume normal operation.
    - If timer expires, transmit emergency LoRa broadcast (`+22 dBm` SOS packet) and signal phone app to dispatch automated SMS/WhatsApp with GPS coordinates.
  - **Acceptance Criteria**: False alarms can be aborted within 30 seconds; expired timer triggers full emergency broadcast.

- [x] **TASK-SAF-02: Implement Anti-Hijack Staged Engine Immobilizer Failsafe**
  - **Priority**: P0 (Security)
  - **Target Files**:
    - [src/safety_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/safety_manager.cpp)
    - [src/wireless_arbiter.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/wireless_arbiter.cpp)
  - **Description**: If the motorcycle is ridden away without keyfob (BLE link lost and speed $> 15\text{ km/h}$):
    - Stage 1: Keyfob warns rider on screen.
    - Stage 2: VCU flashes hazard lights and chirps horn.
    - Stage 3: After 45 seconds, VCU initiates smooth ignition cut-off only when vehicle speed drops below $20\text{ km/h}$ for safety.
  - **Acceptance Criteria**: Engine immobilization never trips at high speeds; triggers safely below $20\text{ km/h}$.

- [x] **TASK-SAF-03: Implement Underground Stolen Vehicle LoRa Hunter Mode**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/safety_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/safety_manager.cpp)
    - [src/lora_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/lora_manager.cpp)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Listen for high-priority `StolenVehicleBeaconPacket` broadcasts on emergency LoRa channel. Calculate RSSI/SNR signal strength and render visual "Geiger counter" bars on Screen 5. Modulate buzzer beep frequency as rider approaches bike in multi-level concrete garages.
  - **Acceptance Criteria**: Audio beep frequency increases noticeably as keyfob moves closer to the hidden beacon.

- [x] **TASK-SAF-04: Implement Valet / Guest Speed Limiter Toggle**
  - **Priority**: P2 (Medium)
  - **Target Files**:
    - [src/safety_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/safety_manager.cpp)
    - [src/config_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/config_manager.cpp)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Add `ACTION_VALET_TOGGLE` action. Transmits signed command to VCU enforcing a strict $45\text{ km/h}$ top-speed clamp and valet notification banner on keyfob screen.
  - **Acceptance Criteria**: VCU confirms speed limiter engagement; keyfob renders yellow "VALET MODE" badge.

---

## Phase 7: Smartphone Companion Synergy, Apple ANCS & BLE OTA Engine (Days 23–26)

- [x] **TASK-MOB-01: Implement Bi-Directional "Find My" Utility**
  - **Priority**: P0 (Core)
  - **Target Files**:
    - [src/ble_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ble_manager.cpp)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**:
    - **Find My Keyfob**: Receiving `FindMyAlertPacket` from phone wakes screen to Screen 14A (solid white strobe @ 100% brightness), strobes RGB LED red/blue, and buzzes haptic motor until dismissed.
    - **Find My Phone**: Long-press Button 1 + Button 3 transmits high-priority alert to phone app, triggering 100% volume audible alarm overriding silent/mute mode. Screen 14B renders live BLE RSSI distance bars.
  - **Acceptance Criteria**: Phone rings audibly even if set to hardware mute; keyfob flashes strobe until any button is pressed.

- [x] **TASK-MOB-02: Implement Anti-Loss "Virtual Leash" Tethering Subsystem**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [include/distance_estimator.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/distance_estimator.h)
    - [src/ble_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ble_manager.cpp)
  - **Description**: Monitor BLE RSSI between smartphone and keyfob:
    - If keyfob moves $> 15\text{m}$ away from phone (RSSI $< -88\text{ dBm}$ for 5 seconds while vehicle speed is 0):
      - Keyfob vibrates violently and displays Screen 16: *"Smart Phone Left Behind!"*
      - Phone companion app detects link drop and sounds 100% volume anti-loss alarm with push banner: *"Keyfob Left Behind!"*
  - **Acceptance Criteria**: Reliable separation alarm triggers within 6 seconds when rider walks away without their phone or keyfob.

- [x] **TASK-MOB-03: Implement Apple ANCS & Android Notification Consumer (`AncsClient`)**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [include/ancs_client.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/ancs_client.h)
    - [src/ancs_client.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ancs_client.cpp)
  - **Description**: Implement BLE GATT client subscribing to Apple Notification Center Service (ANCS) and Android Notification Listener:
    - Filter notifications to allow only VIP calls and emergency alerts.
    - Parse `NotificationPeekPacket` and display Screen 17 modal pop-up with caller name and number.
    - Pressing Button 3 answers on helmet intercom; pressing Button 2 sends canned SMS: *"I am currently riding my motorcycle. Will call you back shortly."*
  - **Acceptance Criteria**: Incoming calls pop up on Screen 17 in real time; Button 2 rejects call and sends automated SMS.

- [x] **TASK-MOB-04: Implement Dual-Partition BLE OTA Firmware Update Engine (`OtaManager`)**
  - **Priority**: P0 (Blocker)
  - **Target Files**:
    - [include/ota_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/ota_manager.h)
    - [src/ota_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ota_manager.cpp)
  - **Description**: Implement custom BLE OTA GATT Service (`0x8018`):
    - `OTA_CONTROL_CHAR`: Receives `BleOtaHeaderPacket` (firmware size, version, total chunks, SHA-256 hash).
    - `OTA_DATA_CHAR`: High-throughput 512-byte binary chunk streaming (`BleOtaChunkPacket`) with CRC-16 checksums.
    - Write chunks to inactive partition (`ota_1`) via `esp_ota_begin()` and `esp_ota_write()`.
    - Compute full SHA-256 validation; mark new partition bootable via `esp_ota_set_boot_partition()`.
    - Render live transfer progress on Screen 15.
    - **Automated Rollback Guard**: If new firmware crashes or watchdogs within 30 seconds of first boot, bootloader reverts automatically to stable `ota_0` partition.
  - **Acceptance Criteria**: 1MB firmware uploads wirelessly in $< 60\text{ seconds}$; corrupted binaries are rejected before reboot; bad builds roll back cleanly.

- [x] **TASK-MOB-05: Implement Turn-by-Turn Navigation Streamer & Speed Camera Warning**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/ble_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ble_manager.cpp)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Receive packed `TurnByTurnNavPacket` updates over BLE from companion phone app (Google Maps/Apple Maps). Render maneuver vector arrows, street names, distance countdown, and speed camera early warnings on Screen 9.
  - **Acceptance Criteria**: Updates navigation icon and countdown meter in real time as vehicle progresses along route.

- [x] **TASK-MOB-06: Implement Telemetry Bulk Sync & Strava/GPX / Mechanic PDF Exporter**
  - **Priority**: P2 (Medium)
  - **Target Files**:
    - [src/ble_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ble_manager.cpp)
  - **Description**: Negotiate 512-byte MTU over BLE GATT to stream cached `RideSummaryLogPacket` and 60-second 20 Hz pre-crash circular buffer to phone app in $< 4\text{ seconds}$. Phone app converts coordinates and lean angles to Strava GPX files and compiles mechanic service PDF report.
  - **Acceptance Criteria**: Clean, error-free bulk binary stream transfer over BLE GATT.

- [x] **TASK-MOB-07: Implement Group LoRa P2P Quick-Messaging & Multi-Bike Profile Switcher**
  - **Priority**: P2 (Medium)
  - **Target Files**:
    - [src/lora_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/lora_manager.cpp)
    - [src/config_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/config_manager.cpp)
  - **Description**: Implement `GroupQuickMsgPacket` transmission/reception on Screen 11 (*"Need Gas"*, *"Regroup"*, etc.) without cellular signal. Implement Screen 12 multi-bike profile switcher storing pairing keys for up to 3 motorcycles.
  - **Acceptance Criteria**: Buddy keyfobs display message banner within 200ms of button click; profile switch successfully pairs with Bike 2.

- [x] **TASK-MOB-08: Implement Mobile App Theme Studio & Custom Boot Splash Generator**
  - **Priority**: P2 (Medium)
  - **Target Files**:
    - [src/ble_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ble_manager.cpp)
    - [src/ui_views.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/ui_views.cpp)
  - **Description**: Receive `ThemeConfigPacket` over BLE to dynamically change active theme (Brembo Racing Red, Yamaha Blue, Kawasaki Lime, Stealth Mono). Support uploading custom $240 \times 280$ 16-bit RGB565 boot splash images into SPIFFS flash partition.
  - **Acceptance Criteria**: Theme colors update instantaneously across all screens; custom boot splash displays on startup.

---

## Phase 8: Power Management, Low-Power FSM & Deep-Sleep Tuning (Days 27–29)

- [x] **TASK-PWR-01: Implement 4-Tier Inactivity Power Management State Machine**
  - **Priority**: P0 (Core)
  - **Target Files**:
    - [include/power_manager.h](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/include/power_manager.h)
    - [src/power_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/power_manager.cpp)
  - **Description**: Implement FreeRTOS power manager task cycling through 4 states:
    - **State 1 (Active Telemetry)**: Display ON, Backlight 70%, BLE 20Hz (~45mA).
    - **State 2 (Dimmed Mode)**: After 15s inactivity, Backlight 10%, BLE throttled to 2Hz (~18mA).
    - **State 3 (Display Sleep)**: After 25s inactivity, Backlight OFF, ST7789 sleep cmd (`0x10`), BLE connected (~3.5mA).
    - **State 4 (Ultra-Deep Sleep)**: After 30s disconnected from bike, ESP32-C3 enters deep sleep, SX1262 warm sleep retention ($< 22\text{ µA}$, $> 18$ months standby).
  - **Acceptance Criteria**: Clean, seamless state transitions based on timer expirations and button activity.

- [x] **TASK-PWR-02: Configure RTC GPIO Wakeup & $< 5\text{ ms}$ Instant Wake-to-TX**
  - **Priority**: P0 (Core)
  - **Target Files**:
    - [src/power_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/power_manager.cpp)
  - **Description**: Configure `esp_deep_sleep_enable_gpio_wakeup` for GPIOs 12, 13, 14, 15. Store active button mapping table in RTC Fast Memory (`RTC_DATA_ATTR`). Upon wakeup, read the wake cause, immediately transmit the LoRa/BLE command in $< 5\text{ ms}$, and only then initialize the display.
  - **Acceptance Criteria**: Command is transmitted to motorcycle before display backlight illuminates; user experiences zero click latency.

- [x] **TASK-PWR-03: Optimize Peripheral Sleep Currents (ST7789 & SX1262)**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/display_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/display_manager.cpp)
    - [src/lora_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/lora_manager.cpp)
  - **Description**: Put ST7789 into low-power sleep mode (`SLPIN 0x10`) and disable DC-DC converter. Command SX1262 into `SetSleep()` with register retention ($< 600\text{ nA}$). Pull down SPI chip-select lines to prevent floating pin leakage current.
  - **Acceptance Criteria**: Multimeter in series with battery measures total deep-sleep quiescent current $< 25\text{ µA}$.

- [x] **TASK-PWR-04: Implement LiPo Fuel Gauge & Low-Voltage Auto-Cutoff**
  - **Priority**: P1 (High)
  - **Target Files**:
    - [src/power_manager.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/power_manager.cpp)
  - **Description**: Read battery voltage via ADC1_CH3. Map voltage through non-linear LiPo discharge lookup table to calculate accurate percentage ($0\% - 100\%$). If battery drops below $3.35\text{ V}$, flash low-battery icon and force immediate deep sleep to protect LiPo chemistry from over-discharge.
  - **Acceptance Criteria**: Battery percentage matches real LiPo capacity curve; auto-cutoff engages at 3.35V.

---

## Phase 9: System Integration, Enclosure Fitting & RF Field Tests (Days 30–32)

- [ ] **TASK-INT-01: Refactor Codebase into Modular Architecture**
  - **Priority**: P0 (Architecture)
  - **Target Files**:
    - [src/main.cpp](file:///c:/Users/sunil/Documents/GitHub/Motorcycle_controller_v3/firmware/remote-keyfob/src/main.cpp)
    - All subsystem headers and sources
  - **Description**: Cleanly decouple monolithic prototype `main.cpp` into the structured modular headers and sources outlined in Section 7 of the architecture plan. Implement FreeRTOS queues for inter-task communication.
  - **Acceptance Criteria**: Zero circular dependencies; modular compilation with zero compiler warnings.

- [ ] **TASK-INT-02: 3D Enclosure Mechanical Fitting & Ergonomics Validation**
  - **Priority**: P1 (Mechanical)
  - **Target Files**: Enclosure CAD / 3D Print
  - **Description**: Verify physical fit of ESP32-C3 board, SmartElex 1.69" LCD, 450mAh LiPo battery, and tactile buttons inside the $65\text{ mm} \times 40\text{ mm} \times 14\text{ mm}$ enclosure. Ensure tactile button travel ($0.3\text{ mm}$) and light pipe alignment for the WS2812B RGB LED.
  - **Acceptance Criteria**: Enclosure snaps together cleanly; all 4 buttons actuate with crisp tactile click; display window is flush.

- [ ] **TASK-INT-03: Sunlight Readability & Optical Performance Benchmarking**
  - **Priority**: P1 (UX)
  - **Target Files**: Display evaluation
  - **Description**: Test the SmartElex 1.69" IPS panel under direct midday sunlight ($> 80,000\text{ lux}$). Evaluate UI theme contrast ratios; adjust primary font weights and tachometer arc thickness to guarantee glanceable readability while riding.
  - **Acceptance Criteria**: Speedometer and gear indicator readable at an arm's length under harsh overhead sunlight.

- [ ] **TASK-INT-04: Full RF Field Distance & Range Verification**
  - **Priority**: P0 (Validation)
  - **Target Files**: Field test log
  - **Description**: Conduct field range testing on motorcycle:
    - BLE pocket range: Verify reliable 20 Hz OBD telemetry at $8-15\text{ meters}$.
    - BLE line-of-sight: Verify connectivity up to $40-65\text{ meters}$.
    - LoRa pocket range: Verify remote lock/unlock and telemetry ping at $450-700\text{ meters}$.
    - LoRa line-of-sight: Verify remote control at $1.8-2.5\text{ km}$.
    - LoRa high-power SOS mode ($+22\text{ dBm}$): Verify emergency packet reception at $3.5-5.0\text{ km}$.
    - Basement parking: Verify signal penetration through 2–3 concrete slabs.
  - **Acceptance Criteria**: Measured communication distances meet or exceed the range matrix specifications in Section 3.3.1.
