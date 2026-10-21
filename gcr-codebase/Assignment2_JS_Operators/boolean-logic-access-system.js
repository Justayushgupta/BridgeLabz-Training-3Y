// Q5. Boolean Logic Access System
// Demonstrates Boolean operators: && (AND), || (OR), ! (NOT)

// Function to evaluate and print security status based on current boolean values
function checkSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
  // Access is granted only if:
  //   - Alarm is ON
  //   - Door is locked
  //   - Window is closed
  //   - Owner is inside
  const isSecure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;

  console.log(`isDoorLocked=${isDoorLocked}, isWindowClosed=${isWindowClosed}, isAlarmOn=${isAlarmOn}, isOwnerInside=${isOwnerInside}`);
  console.log("Status:", isSecure ? "✅ Secure" : "⚠️  Unsafe");
  console.log("---");
}

// Test Case 1: All conditions met → Secure
checkSecurity(true, true, true, true);

// Test Case 2: Alarm is off → Unsafe
checkSecurity(true, true, false, true);

// Test Case 3: Owner not inside → Unsafe
checkSecurity(true, true, true, false);

// Test Case 4: Window open and alarm off → Unsafe
checkSecurity(true, false, false, true);

// Test Case 5: Nothing is set → Unsafe
checkSecurity(false, false, false, false);
