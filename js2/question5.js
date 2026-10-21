/**
 * Q5. Boolean Logic Access System
 * 
 * Requirements:
 * - Variables: isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside.
 * - Access is granted only if:
 *   - Alarm is on
 *   - Door and window are closed
 *   - Owner is inside
 * - Use Boolean logic (&&, ||, !) to print "Secure" or "Unsafe".
 * - Change values and test multiple outcomes.
 */

// Function to evaluate security status using Boolean logic (&&, ||, !)
function evaluateSmartHomeSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
    console.log(`Checking Status -> Door Locked: ${isDoorLocked}, Window Closed: ${isWindowClosed}, Alarm On: ${isAlarmOn}, Owner Inside: ${isOwnerInside}`);

    // Evaluation using Boolean operators:
    // Method 1: Using && (all conditions must be true)
    const isAccessGranted = isDoorLocked && isWindowClosed && isAlarmOn && isOwnerInside;

    // Method 2: Demonstrating || and ! (any security breach makes it Unsafe)
    const hasSecurityBreach = !isDoorLocked || !isWindowClosed || !isAlarmOn || !isOwnerInside;

    let securityStatus = "";
    if (isAccessGranted && !hasSecurityBreach) {
        securityStatus = "Secure";
    } else {
        securityStatus = "Unsafe";
    }

    console.log(`Security Assessment: "${securityStatus}"\n`);
    return securityStatus;
}

// 1. Default secure scenario
console.log("=== Scenario 1: All Conditions Met ===");
evaluateSmartHomeSecurity(true, true, true, true);

// 2. Change values and test multiple outcomes
console.log("=== Scenario 2: Door Unlocked (!isDoorLocked) ===");
evaluateSmartHomeSecurity(false, true, true, true);

console.log("=== Scenario 3: Window Open (!isWindowClosed) ===");
evaluateSmartHomeSecurity(true, false, true, true);

console.log("=== Scenario 4: Alarm Disabled (!isAlarmOn) ===");
evaluateSmartHomeSecurity(true, true, false, true);

console.log("=== Scenario 5: Owner Outside (!isOwnerInside) ===");
evaluateSmartHomeSecurity(true, true, true, false);

console.log("=== Scenario 6: Multiple Breaches ===");
evaluateSmartHomeSecurity(false, false, false, false);
