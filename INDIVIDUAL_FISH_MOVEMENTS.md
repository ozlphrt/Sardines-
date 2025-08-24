# Individual Fish Movements - Sardines

## Comprehensive Movement Characteristics Table

| **Movement Type** | **Description** | **Parameters** | **Biological Values** | **Implementation Notes** |
|------------------|-----------------|----------------|----------------------|-------------------------|
| **UNDULATION (Body Wave Motion)** | S-shaped body waves for propulsion | Frequency: 2-4 Hz<br>Amplitude: 0.1-0.3 body lengths<br>Phase offset: 0-2π<br>Speed multiplier: 1.0-2.5x | Swimming frequency increases with speed<br>Amplitude decreases at high speeds<br>Continuous wave motion | Apply sinusoidal rotation to body segments<br>Tail has highest amplitude<br>Head minimal movement |
| **ROLL (Lateral Tilting)** | Banking during turns like aircraft | Max angle: 15-45°<br>Roll speed: 2-5 rad/s<br>Recovery time: 0.2-0.5s<br>Turn correlation: 0.8-1.0 | Steeper rolls for sharper turns<br>Quick return to level<br>Banking into direction of turn | Apply Z-axis rotation during direction changes<br>Gradual roll-in and roll-out<br>Clamp to max angles |
| **SPEED VARIATION** | Different swimming modes | Resting: 0.5-1 BL/s<br>Cruising: 1-2 BL/s<br>Active: 2-3 BL/s<br>Burst: 3-5 BL/s<br>Acceleration: 2-4 BL/s² | BL = Body Length<br>Burst speed only sustainable for 2-5s<br>Gradual transitions between modes | Implement speed states with transitions<br>Add acceleration/deceleration curves<br>Energy cost considerations |
| **DIRECTION CHANGES** | Steering and navigation | Turn radius: 2-3 BL minimum<br>Turn rate: 90°/s max<br>Smooth transitions: 0.5-1.0s<br>Predictive steering: 0.2-0.5s ahead | Gradual course corrections<br>Sharp turns for obstacle avoidance<br>Banking accompanies turns | Use quaternion interpolation<br>Combine with roll behavior<br>Smooth velocity vector changes |
| **DEPTH CONTROL** | Vertical movement in water column | Depth change rate: 1-3 BL/s<br>Preferred depth zones<br>Pressure sensitivity<br>Buoyancy adjustments | Thermal layer preferences<br>Pressure adaptation<br>Schooling depth coordination | Y-axis position changes<br>Buoyancy force simulation<br>Environmental depth preferences |
| **TAIL BEAT FREQUENCY** | Primary propulsion mechanism | Frequency: 2-6 Hz<br>Amplitude: 0.2-0.4 BL<br>Speed correlation: linear<br>Efficiency curve | Higher frequency = higher speed<br>Optimal efficiency at 3-4 Hz<br>Fatigue at max frequency | Animate tail section separately<br>Frequency drives forward motion<br>Visual tail wagging effect |
| **PECTORAL FIN MOTION** | Maneuvering and stability | Beat frequency: 8-15 Hz<br>Amplitude: 0.1-0.2 BL<br>Steering contribution: 20-30%<br>Stability role: continuous | Fine maneuvering control<br>Braking and backing<br>Station-keeping | Subtle side-to-side motion<br>Higher frequency than tail<br>Independent of main propulsion |
| **CAUDAL FIN ANGLE** | Steering and lift control | Angle range: ±30°<br>Response time: 0.1-0.2s<br>Lift generation<br>Steering input | Primary steering mechanism<br>Coupled with body roll<br>Rapid response capability | Rotate tail fin independently<br>Combine with body undulation<br>Quick angle changes |
| **STARTLE RESPONSE** | Rapid escape behavior | Response time: 0.02-0.05s<br>Peak acceleration: 10-20 BL/s²<br>C-start maneuver<br>Duration: 0.1-0.3s | Fastest fish movement<br>C-shaped body bend<br>Explosive acceleration | Instant direction change<br>Maximum acceleration<br>Override normal movement |
| **SCHOOLING ADJUSTMENTS** | Social movement coordination | Neighbor distance: 1-2 BL<br>Alignment response: 0.1-0.3s<br>Speed matching: ±20%<br>Position corrections | Maintain group cohesion<br>Match neighbor speeds<br>Avoid collisions | Continuous micro-adjustments<br>Neighbor awareness<br>Group velocity matching |
| **FEEDING MOVEMENTS** | Foraging behavior patterns | Dart frequency: 2-5/min<br>Search patterns: zigzag<br>Mouth opening: 0.05-0.1s<br>Return to school: 1-3s | Quick feeding darts<br>Return to group safety<br>Opportunistic behavior | Random direction darts<br>Brief speed increases<br>Return to formation |
| **CIRCADIAN RHYTHM** | Daily activity patterns | Active periods: dawn/dusk<br>Rest periods: night<br>Speed reduction: 50-70%<br>Formation changes | Lower activity at night<br>Tighter schools when resting<br>Reduced movement | Time-based speed modulation<br>Formation density changes<br>Activity level variations |
| **ENVIRONMENTAL RESPONSE** | Reaction to external stimuli | Current adaptation: 10-30°<br>Temperature seeking<br>Light following/avoiding<br>Pressure changes | Adjust heading for currents<br>Seek optimal temperatures<br>Respond to light levels | Environmental force vectors<br>Preference-based movements<br>Gradient following |
| **EVASIVE MANEUVERS** | Predator avoidance patterns | Zigzag pattern: 30-60° turns<br>Diving response: 2-5 BL depth<br>Schooling tightness: 0.5-1 BL<br>Duration: 5-30s | Unpredictable movement<br>Coordinated group evasion<br>Depth changes for escape | Rapid direction changes<br>Synchronized group response<br>Emergency speed increases |
| **RESTING BEHAVIOR** | Low-energy maintenance | Minimal undulation<br>Reduced tail beats<br>Station-keeping only<br>Group coordination | Energy conservation<br>Maintain position in school<br>Minimal movement | Reduced animation intensity<br>Lower movement frequencies<br>Position maintenance only |

## Implementation Priority

### Phase 1 - Core Movement
1. **Undulation** - Primary swimming animation
2. **Speed Variation** - Basic speed states
3. **Direction Changes** - Steering behavior
4. **Roll** - Banking during turns

### Phase 2 - Advanced Behavior
5. **Depth Control** - Vertical movement
6. **Tail Beat Frequency** - Realistic propulsion
7. **Startle Response** - Emergency reactions
8. **Schooling Adjustments** - Social coordination

### Phase 3 - Environmental
9. **Environmental Response** - External stimuli
10. **Evasive Maneuvers** - Predator avoidance
11. **Feeding Movements** - Foraging behavior
12. **Circadian Rhythm** - Time-based patterns

## Technical Implementation Notes

### Animation System
- Use bone-based animation for body undulation
- Separate tail, body, and fin animations
- Layer multiple movement types
- Smooth blending between states

### Physics Integration
- Combine with flocking algorithms
- Environmental force responses
- Collision avoidance integration
- Energy-based movement costs

### Performance Considerations
- LOD system for distant fish
- Simplified animations at distance
- Batch similar movements
- Optimize for 60fps with 200+ fish

### Biological Accuracy
- All values based on marine biology research
- Scalable to different fish sizes
- Species-specific parameter sets
- Realistic energy expenditure models

---

*BL = Body Length (typical sardine: 15-25cm)*
*All timing values are for adult sardines in normal conditions*
*Parameters may vary based on environmental factors and individual fish size*
