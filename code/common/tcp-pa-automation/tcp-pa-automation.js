/**********************************************************************/
/******** Unified TCP Process Automation - PowerAutomate Flows ********/
/**********************************************************************/

(function (Knack) {
  'use strict';

  // ====================
  // EMOJI CONSTANTS FOR RECORD TYPES
  // ====================
  const EMOJI = {
    PROJECT: '💼',      // Project Record ID
    ROUND: '📁',        // Round Record ID
    CYCLE: '🔄',        // Cycle Record ID
    AUTOMATION: '🆔'    // Automation ID
  };

  // ====================
  // LOGGING FUNCTIONS
  // ====================
  function log(...args) {
    console.log('%c[Knack Auto-Refresh]', 'background: #9C27B0; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  function logFlowR(...args) {
    console.log('%c[PA Flow R]', 'background: #E91E63; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  function logFlowRC(...args) {
    console.log('%c[PA Flow rC]', 'background: #FF5722; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  function logFlowRC1(...args) {
    console.log('%c[PA Flow rC1]', 'background: #F57C00; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  function logFlowIC(...args) {
    console.log('%c[PA Flow iC]', 'background: #FF5722; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  function logFlowIC1(...args) {
    console.log('%c[PA Flow iC1]', 'background: #F44336; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  function logFlowCIC1(...args) {
    console.log('%c[PA Flow ciC1]', 'background: #D32F2F; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  function logFlowU(...args) {
    console.log('%c[PA Flow U]', 'background: #4CAF50; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  function logFlowP(...args) {
    console.log('%c[PA Flow P]', 'background: #2196F3; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  // ====================
  // CONFIGURATION
  // ====================
  const CONFIG = {
    // All monitored forms
    forms: {
      // Staff Project Creation - Intake Cycle with Round
      view_1373: {
        type: 'intake_cycle_with_round_ic1',
        flows: ['R', 'iC1', 'U', 'P'],
        description: 'Staff Project Creation - Create Round & 1st Intake Cycle'
      },

      // Intake Cycle form (no Round)
      view_1689: {
        type: 'intake_cycle_only',
        flows: ['iC', 'U', 'P'],
        description: 'Create Intake Cycle'
      },

      // First Review Cycle form
      view_1688: {
        type: 'first_review_cycle',
        flows: ['rC1', 'U', 'P'],
        description: 'Create 1st Review Cycle + Transfer Content'
      },

      // Review Cycle form
      view_1687: {
        type: 'review_cycle',
        flows: ['rC', 'U', 'P'],
        description: 'Create Review Cycle'
      },

      // Customer Project Creation - Intake Cycle with Round
      view_1075: {
        type: 'intake_cycle_with_round_cic1',
        flows: ['R', 'ciC1', 'U', 'P'],
        description: 'Customer Project Creation - Create Round & 1st Intake Cycle (ciC1)'
      },

      // Customer-facing forms (cycle already created by form, just needs U & P)
      view_1393: {
        type: 'cycle_update_only',
        flows: ['U', 'P'],
        description: 'Customer Intake Cycle'
      },
      view_1647: {
        type: 'cycle_update_only',
        flows: ['U', 'P'],
        description: 'Customer 1st Review Cycle'
      },
      view_913: {
        type: 'cycle_update_only',
        flows: ['U', 'P'],
        description: 'Customer Review Cycle'
      }
    },
    
    // PowerAutomate Flow URLs
    flowUrls: {
      R: 'https://prod-08.usgovtexas.logic.azure.us:443/workflows/ef368a417608495783f67d5377455950/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z64x-_80hyVAPgfjjkXCCGJQ0BWn-D-AGwB5r-HUGFw',
      rC: 'https://prod-24.usgovtexas.logic.azure.us:443/workflows/97eb3e24d26d423eb9c96258494dce04/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zz2BK3y_tYn03Q9E4Se--fml49egWFmt9OkwO3O8v1Q',
      rC1: 'https://prod-35.usgovtexas.logic.azure.us:443/workflows/a4581428a5514eca8a7062a184e567a0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ewKkYqb3er_TLgO7ooVT10SHTWeD6M5V869SD7vB17Y',
      iC: 'https://prod-03.usgovtexas.logic.azure.us:443/workflows/9d3c05c5e3c24746a263c8aed6d46f60/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YpFbJhyA5WHN9ugLC08kWAZfkKYePZ_y9C__JktoYNM',
      iC1: 'https://prod-50.usgovtexas.logic.azure.us:443/workflows/61357f18a97644088256112a4e533c48/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lWLNzZPLZhOzXzmkwy-BZlCsJbMy9vBf1qx8A3fsj6M',
      ciC1: 'https://prod-62.usgovtexas.logic.azure.us:443/workflows/7448983fcf104882a8fa85052b99eb44/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mc1xkK-efDZfCC718cPtbQib0C8yO8KMjw2q7gXsdPg',
      U: 'https://prod-61.usgovtexas.logic.azure.us:443/workflows/276b9618f6a144399f09563e0f764ea8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=80QkHEIAt4SX5dMdIdRf0Y_AcSgtM4yzy8E2JuXt9UA',
      P: 'https://prod-40.usgovtexas.logic.azure.us:443/workflows/0996af8f2d764b7580202f391d20b632/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WujBv3GLBd3W-MC889WWlh5Jc8dICPLSJhrj8aZEmhg'
    },
    
    // Polling settings
    initialDelayMs: 2000,
    pollIntervalMs: 1000,
    fallbackDelayMs: 24000,
    showCountdown: true
  };

  // Log startup info
  log('✅ Unified TCP Process PA Automation Ready! 🚗');
  log('📋 Monitoring forms:', Object.keys(CONFIG.forms).join(', '));
  Object.entries(CONFIG.forms).forEach(([view, config]) => {
    log(`   ${view}: ${config.description} [${config.flows.join(' → ')}]`);
  });
  log('⏰ Polling every 1s, fallback 24s');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // ====================
  // UTILITY FUNCTIONS
  // ====================
  function generateAutomationId(cycleRecordId) {
    return `PA_${cycleRecordId}`;
  }

  function getLoggedInUserId() {
    try {
      const userAttrs = Knack.getUserAttributes();
      if (userAttrs && userAttrs.id) return userAttrs.id;
      if (Knack.user_id) return Knack.user_id;
      log('⚠️ Could not determine logged-in user ID');
      return null;
    } catch (error) {
      log('❌ Error getting user ID:', error.message);
      return null;
    }
  }

  function getProjectData(record) {
    const projectId = record.id;
    
    let customerAccountId = null;
    if (record.field_1084_raw && record.field_1084_raw.length > 0) {
      customerAccountId = record.field_1084_raw[0].id;
    }
    
    let leadReviewer = null;
    if (record.field_345_raw && record.field_345_raw.length > 0) {
      leadReviewer = record.field_345_raw[0].id;
    }
    
    let submissionReviewer = null;
    if (record.field_931_raw && record.field_931_raw.length > 0) {
      submissionReviewer = record.field_931_raw[0].id;
    }
    
    let lastSubmittalDate = null;
    if (record.field_1520_raw) {
      lastSubmittalDate = record.field_1520_raw.iso_timestamp || record.field_1520_raw.date || record.field_1520_raw.timestamp;
    }
    
    return {
      projectId,
      customerAccountId,
      leadReviewer,
      submissionReviewer,
      lastSubmittalDate
    };
  }

  // ====================
  // VISUAL COUNTDOWN UI
  // ====================
  function updateStatusMessage(secondsLeft) {
    let message = '';
    if (secondsLeft >= 20) message = 'Creating Records';
    else if (secondsLeft >= 15) message = 'Connecting Records';
    else if (secondsLeft >= 10) message = 'Updating Project';
    else if (secondsLeft >= 5) message = 'Finalizing Data';
    else if (secondsLeft > 0) message = 'Almost Done';
    else message = 'Complete!';
    $('#status-message').text(message);
  }

  function showPollingNotification(totalSeconds) {
    $('#auto-refresh-notification').remove();
    
    $('<div>')
      .attr('id', 'auto-refresh-notification')
      .css({
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '20px 25px',
        backgroundColor: '#9C27B0',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: 99999,
        fontFamily: 'Arial, sans-serif',
        fontSize: '15px',
        fontWeight: 'bold',
        minWidth: '320px',
        transition: 'background-color 0.5s ease'
      })
      .html(`
        <div style="margin-bottom: 12px; font-size: 16px; color: #000000;">
          Refreshing page in <span id="countdown-seconds" style="font-weight: bold;">${totalSeconds}</span> seconds...
        </div>
        <div id="road-container" style="position: relative; height: 40px; background-color: #555; border-radius: 4px; overflow: hidden; border: 2px solid rgba(255,255,255,0.3);">
          <div style="position: absolute; width: 100%; height: 100%; background-color: #555;"></div>
          <div style="position: absolute; width: 100%; top: 35%; height: 3%; background: repeating-linear-gradient(to right, #FFD700 0px, #FFD700 8px, transparent 8px, transparent 16px);"></div>
          <div style="position: absolute; width: 100%; top: 62%; height: 3%; background: repeating-linear-gradient(to right, #FFD700 0px, #FFD700 8px, transparent 8px, transparent 16px);"></div>
          <div id="car" style="position: absolute; top: 50%; transform: translateY(-50%) scaleX(-1); left: 0%; font-size: 24px; transition: left 0.3s linear; z-index: 10;">🚗</div>
          <div style="position: absolute; top: 50%; transform: translateY(-50%) rotate(0deg); right: 4px; z-index: 10;">
            <div style="position: relative; width: 32px; height: 32px; background: #DC143C; border: 2.5px solid white; border-radius: 3px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              <span style="color: white; font-size: 9px; font-weight: bold; font-family: Arial, sans-serif; line-height: 1; text-align: center;">DONE</span>
            </div>
          </div>
        </div>
        <div id="status-message" style="margin-top: 8px; font-size: 16px; opacity: 1; text-align: center; color: #000000; font-weight: 500;">
          Creating Records
        </div>
      `)
      .appendTo('body')
      .hide()
      .fadeIn(300);
  }

  function updateCountdown(secondsLeft, totalSeconds) {
    $('#countdown-seconds').text(secondsLeft);
    const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 85;
    $('#car').css('left', progress + '%');
    updateStatusMessage(secondsLeft);
    
    const notification = $('#auto-refresh-notification');
    if (secondsLeft > 10) notification.css('backgroundColor', '#9C27B0');
    else if (secondsLeft > 3) notification.css('backgroundColor', '#FF9800');
    else notification.css('backgroundColor', '#FF6B6B');
    
    if (secondsLeft % 5 === 0 && secondsLeft > 0) {
      $('#car').css('transform', 'translateY(-60%) scaleX(-1) scale(1.1)');
      setTimeout(() => $('#car').css('transform', 'translateY(-50%) scaleX(-1) scale(1)'), 150);
    }
  }

  function showCompletion() {
    $('#auto-refresh-notification').css('backgroundColor', '#4CAF50');
    $('#car').css('left', '85%');
    updateStatusMessage(0);
  }

  function removeNotification() {
    $('#auto-refresh-notification').fadeOut(300, function() {
      $(this).remove();
    });
  }

  // ====================
  // FLOW TRIGGER FUNCTIONS
  // ====================
  
  // Generic flow trigger function
  async function triggerFlow(flowName, logFunc, payload, responseField) {
    try {
      logFunc(`🚀 Triggering Flow ${flowName} with payload:`, JSON.stringify(payload));
      
      const response = await fetch(CONFIG.flowUrls[flowName], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const data = await response.json();
        return responseField ? data[responseField] : true;
      } else {
        const errorText = await response.text();
        logFunc(`❌ Flow ${flowName} failed (${response.status}):`, errorText);
        return null;
      }
    } catch (error) {
      logFunc(`❌ Error triggering Flow ${flowName}:`, error.message);
      return null;
    }
  }

  // Flow R - Create Round
  async function triggerFlowR(projectData) {
    const result = await triggerFlow('R', logFlowR, {
      project_id: projectData.projectId || ''
    }, 'round_record_id');
    
    if (result) {
      logFlowR(`✅ Flow R response (200): ${EMOJI.ROUND} Round Record ID:`, result);
    }
    
    return result;
  }

  // Flow rC - Create Review Cycle
  async function triggerFlowRC(projectData, loggedInUserId) {
    const result = await triggerFlow('rC', logFlowRC, {
      project_id: projectData.projectId || '',
      customer_account_id: projectData.customerAccountId || '',
      lead_reviewer: projectData.leadReviewer || '',
      submission_reviewer: projectData.submissionReviewer || '',
      last_submittal_date: projectData.lastSubmittalDate || '',
      logged_in_user_id: loggedInUserId || ''
    }, 'cycle_record_id');
    
    if (result) {
      logFlowRC(`✅ Flow rC response (200): ${EMOJI.CYCLE} Cycle Record ID:`, result);
    }
    
    return result;
  }

  // Flow rC1 - Create 1st Review Cycle
  async function triggerFlowRC1(projectData, loggedInUserId) {
    const result = await triggerFlow('rC1', logFlowRC1, {
      project_id: projectData.projectId || '',
      customer_account_id: projectData.customerAccountId || '',
      lead_reviewer: projectData.leadReviewer || '',
      submission_reviewer: projectData.submissionReviewer || '',
      last_submittal_date: projectData.lastSubmittalDate || '',
      logged_in_user_id: loggedInUserId || ''
    }, 'cycle_record_id');
    
    if (result) {
      logFlowRC1(`✅ Flow rC1 response (200): ${EMOJI.CYCLE} Cycle Record ID:`, result);
    }
    
    return result;
  }

  // Flow iC - Create Intake Cycle (original)
  async function triggerFlowIC(projectData, loggedInUserId) {
    const result = await triggerFlow('iC', logFlowIC, {
      project_id: projectData.projectId || '',
      customer_account_id: projectData.customerAccountId || '',
      lead_reviewer: projectData.leadReviewer || '',
      submission_reviewer: projectData.submissionReviewer || '',
      last_submittal_date: projectData.lastSubmittalDate || '',
      logged_in_user_id: loggedInUserId || ''
    }, 'cycle_record_id');
    
    if (result) {
      logFlowIC(`✅ Flow iC response (200): ${EMOJI.CYCLE} Cycle Record ID:`, result);
    }
    
    return result;
  }

  // Flow iC1 - Create Intake Cycle v1
  async function triggerFlowIC1(projectData, loggedInUserId) {
    const result = await triggerFlow('iC1', logFlowIC1, {
      project_id: projectData.projectId || '',
      customer_account_id: projectData.customerAccountId || '',
      lead_reviewer: projectData.leadReviewer || '',
      submission_reviewer: projectData.submissionReviewer || '',
      last_submittal_date: projectData.lastSubmittalDate || '',
      logged_in_user_id: loggedInUserId || ''
    }, 'cycle_record_id');
    
    if (result) {
      logFlowIC1(`✅ Flow iC1 response (200): ${EMOJI.CYCLE} Cycle Record ID:`, result);
    }
    
    return result;
  }

  // Flow ciC1 - Create Intake Cycle (ciC1 variant)
  async function triggerFlowCIC1(projectData, loggedInUserId) {
    const result = await triggerFlow('ciC1', logFlowCIC1, {
      project_id: projectData.projectId || '',
      customer_account_id: projectData.customerAccountId || '',
      lead_reviewer: projectData.leadReviewer || '',
      submission_reviewer: projectData.submissionReviewer || '',
      last_submittal_date: projectData.lastSubmittalDate || '',
      logged_in_user_id: loggedInUserId || ''
    }, 'cycle_record_id');
    
    if (result) {
      logFlowCIC1(`✅ Flow ciC1 response (200): ${EMOJI.CYCLE} Cycle Record ID:`, result);
    }
    
    return result;
  }

  // Flow U - Update Records
  async function triggerFlowU(cycleRecordId, projectId, automationId) {
    try {
      logFlowU('🚀 Triggering Flow U');
      logFlowU(`${EMOJI.CYCLE} Cycle Record ID:`, cycleRecordId);
      logFlowU(`${EMOJI.PROJECT} Project ID:`, projectId);
      logFlowU(`${EMOJI.AUTOMATION} Automation ID:`, automationId);
      
      const response = await fetch(CONFIG.flowUrls.U, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          record_id: cycleRecordId,
          project_id: projectId,
          automation_id: automationId
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Check if it's a success/error response or async metadata
        if (data.success || data.error) {
          logFlowU(`✅ Flow U response (${response.status}):`, data);
        } else {
          // Async response - just show status code
          logFlowU(`✅ Flow U response (${response.status}): Accepted - Processing asynchronously`);
        }
        return true;
      } else if (response.status === 502) {
        // 502 timeout - Flow P will verify completion, no logging needed
        return true;
      } else {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          logFlowU(`📥 Flow U response (${response.status}):`, errorData);
        } catch {
          logFlowU(`📥 Flow U response (${response.status}):`, errorText);
        }
        return false;
      }
    } catch (error) {
      logFlowU('❌ Error triggering Flow U:', error.message);
      return false;
    }
  }

  // Flow P - Poll for completion
  function startPolling(cycleRecordId, automationId, countdownTimer) {
    logFlowP('📡 Polling Flow P for Automation ID:', automationId);
    
    setTimeout(function() {
      let pollingActive = true;
      let currentPollInterval = null;
      
      async function doPoll() {
        if (!pollingActive) return;
        
        try {
          const response = await fetch(CONFIG.flowUrls.P, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'check_status',
              record_id: cycleRecordId,
              automation_id: automationId
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            
            if (String(data.status).toLowerCase() === 'ready') {
              logFlowP('✅ Flow P response:', data);
              logFlowP('✅ READY! All records created and connected!');
              pollingActive = false;
              if (currentPollInterval) clearInterval(currentPollInterval);
              clearInterval(countdownTimer);
              
              if (CONFIG.showCountdown) showCompletion();
              
              setTimeout(() => {
                logFlowP('🔄 RELOADING PAGE NOW...');
                window.location.reload();
              }, 1000);
              return;
            } else {
              logFlowP('⏳ Flow P response:', data);
            }
          }
        } catch (error) {
          logFlowP('❌ Poll error:', error.message);
        }
      }
      
      doPoll();
      currentPollInterval = setInterval(doPoll, CONFIG.pollIntervalMs);
      
      setTimeout(function() {
        if (pollingActive) {
          logFlowP('⏰ Fallback - reloading');
          pollingActive = false;
          if (currentPollInterval) clearInterval(currentPollInterval);
          clearInterval(countdownTimer);
          
          if (CONFIG.showCountdown) showCompletion();
          
          setTimeout(() => {
            logFlowP('🔄 RELOADING PAGE NOW (fallback)...');
            window.location.reload();
          }, 1000);
        }
      }, CONFIG.fallbackDelayMs - CONFIG.initialDelayMs);
      
    }, CONFIG.initialDelayMs);
  }

  // ====================
  // MAIN EXECUTION LOGIC
  // ====================
  async function executeWorkflow(formConfig, projectData, loggedInUserId, countdownTimer) {
    const flows = formConfig.flows;
    let cycleRecordId = null;
    let roundRecordId = null;

    // Execute flow sequence based on form type
    if (formConfig.type === 'review_cycle') {
      // Flow rC only
      cycleRecordId = await triggerFlowRC(projectData, loggedInUserId);
      
    } else if (formConfig.type === 'first_review_cycle') {
      // Flow rC1 only
      cycleRecordId = await triggerFlowRC1(projectData, loggedInUserId);
      
    } else if (formConfig.type === 'intake_cycle_with_round_ic1') {
      // Flow R + Flow iC1 in parallel (view_1373)
      log('🚀 Triggering Flow R and Flow iC1 in parallel');
      [roundRecordId, cycleRecordId] = await Promise.all([
        triggerFlowR(projectData),
        triggerFlowIC1(projectData, loggedInUserId)
      ]);
      
      if (!roundRecordId || !cycleRecordId) {
        log('❌ Flow R or Flow iC1 failed - using fallback');
        log(`   ${EMOJI.ROUND} Round ID:`, roundRecordId);
        log(`   ${EMOJI.CYCLE} Cycle ID:`, cycleRecordId);
        return false;
      }
      
    } else if (formConfig.type === 'intake_cycle_with_round_cic1') {
      // Flow R + Flow ciC1 in parallel (view_1075)
      log('🚀 Triggering Flow R and Flow ciC1 in parallel');
      [roundRecordId, cycleRecordId] = await Promise.all([
        triggerFlowR(projectData),
        triggerFlowCIC1(projectData, loggedInUserId)
      ]);
      
      if (!roundRecordId || !cycleRecordId) {
        log('❌ Flow R or Flow ciC1 failed - using fallback');
        log(`   ${EMOJI.ROUND} Round ID:`, roundRecordId);
        log(`   ${EMOJI.CYCLE} Cycle ID:`, cycleRecordId);
        return false;
      }
      
    } else if (formConfig.type === 'intake_cycle_only') {
      // Flow iC only
      cycleRecordId = await triggerFlowIC(projectData, loggedInUserId);

    } else if (formConfig.type === 'cycle_update_only') {
      // Cycle already created by the form - use record ID directly
      cycleRecordId = projectData.projectId;
      log(`✅ Using form record ID as ${EMOJI.CYCLE} Cycle ID:`, cycleRecordId);
    }

    // Check if cycle was created
    if (!cycleRecordId) {
      log('❌ Cycle creation failed - using fallback');
      return false;
    }

    // Generate automation ID
    const automationId = generateAutomationId(cycleRecordId);
    log(`${EMOJI.AUTOMATION} Generated Automation ID:`, automationId);

    // Trigger Flow U (fire and forget - Flow P verifies completion)
    triggerFlowU(cycleRecordId, projectData.projectId, automationId);

    // Start polling Flow P immediately
    startPolling(cycleRecordId, automationId, countdownTimer);

    return true;
  }

  // ====================
  // FORM SUBMISSION HANDLER
  // ====================
  let submissionDetected = false;
  
  $(document).on('knack-form-submit.any', async function(event, view, record) {
    if (submissionDetected) return;
    
    log('📝 Form submitted on view:', view.key);
    
    const formConfig = CONFIG.forms[view.key];
    if (!formConfig) {
      log('⏭️  Not a monitored form, ignoring');
      return;
    }

    submissionDetected = true;
    log('✅ FORM TRIGGER DETECTED!');
    log('📋 Form type:', formConfig.description);
    log('🔄 Flow sequence:', formConfig.flows.join(' → '));

    // Show countdown
    const totalSeconds = Math.floor(CONFIG.fallbackDelayMs / 1000);
    if (CONFIG.showCountdown) showPollingNotification(totalSeconds);

    // Start countdown timer
    let secondsLeft = totalSeconds;
    const countdownTimer = setInterval(function() {
      secondsLeft--;
      if (secondsLeft >= 0 && CONFIG.showCountdown) {
        updateCountdown(secondsLeft, totalSeconds);
      }
    }, 1000);

    // Get logged-in user
    const loggedInUserId = getLoggedInUserId();
    if (!loggedInUserId) {
      log('❌ Could not get logged-in user ID - using fallback');
      setTimeout(() => {
        clearInterval(countdownTimer);
        window.location.reload();
      }, CONFIG.fallbackDelayMs);
      return;
    }

    // Extract project data
    const projectData = getProjectData(record);
    if (!projectData.projectId) {
      log('❌ Could not get project ID - using fallback');
      setTimeout(() => {
        clearInterval(countdownTimer);
        window.location.reload();
      }, CONFIG.fallbackDelayMs);
      return;
    }

    // Execute workflow
    const success = await executeWorkflow(formConfig, projectData, loggedInUserId, countdownTimer);
    
    if (!success) {
      setTimeout(() => {
        clearInterval(countdownTimer);
        window.location.reload();
      }, CONFIG.fallbackDelayMs);
    }

    setTimeout(() => {
      submissionDetected = false;
    }, CONFIG.fallbackDelayMs + 5000);
  });

  // ====================
  // MANUAL COMMANDS
  // ====================
  window.triggerRefreshNow = function() {
    log('🖱️  Manual refresh triggered');
    if (CONFIG.showCountdown) removeNotification();
    window.location.reload();
  };

})(window.Knack);

/*************************************************************************/
/******** View 1676 - Connect Cycle to Round - PowerAutomate Flow ********/
/*************************************************************************/

(function (Knack) {
  'use strict';

  function log(...args) {
    console.log('%c[Knack Auto-Refresh]', 'background: #2196F3; color: white; padding: 2px 5px; border-radius: 2px;', ...args);
  }

  // ====================
  // CONFIG
  // ====================
  const CONFIG = {
    triggerViewKey: 'view_1676',   // The form in the modal
    
    // PowerAutomate Flow U webhook URL (does the work)
    flowUWebhookUrl: 'https://prod-61.usgovtexas.logic.azure.us:443/workflows/276b9618f6a144399f09563e0f764ea8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=80QkHEIAt4SX5dMdIdRf0Y_AcSgtM4yzy8E2JuXt9UA',
    
    // PowerAutomate Flow P webhook URL (checks Knack via custom connector)
    flowPWebhookUrl: 'https://prod-40.usgovtexas.logic.azure.us:443/workflows/0996af8f2d764b7580202f391d20b632/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WujBv3GLBd3W-MC889WWlh5Jc8dICPLSJhrj8aZEmhg',
    
    // Polling settings
    initialDelayMs: 2000,          // Wait 2 seconds before first poll (Flow U needs time)
    pollIntervalMs: 1000,          // Check every 1 second initially
    fastPollStartMs: 12000,        // Start polling every 1s after 12 seconds
    fastPollIntervalMs: 1000,      // Check every 1 second after 12s
    fallbackDelayMs: 24000,        // Reload after 24 seconds regardless
    showCountdown: true
  };

  log('Backup Round Connection Automation Ready!');
  log('Monitoring form: view_1647: Connect Cycle to Active Round [U → P]');

  // ====================
  // Generate Automation ID from record
  // ====================
  function generateAutomationId(recordId) {
    return `sub_${recordId}`;
  }

  // ====================
  // Get Project ID from record data
  // ====================
  function getProjectId(record) {
    // field_35 is the Project connection field
    if (record.field_35_raw && record.field_35_raw.length > 0) {
      return record.field_35_raw[0].id;
    }
    return null;
  }

  // ====================
  // Update status message
  // ====================
  function updateStatusMessage(secondsLeft) {
    let message = '';
    
    if (secondsLeft >= 20) {
      message = 'Processing Request';
    } else if (secondsLeft >= 15) {
      message = 'Connecting your Cycle';
    } else if (secondsLeft >= 10) {
      message = 'Petting Kittens';
    } else if (secondsLeft >= 5) {
      message = 'Updating your Project';
    } else if (secondsLeft > 0) {
      message = 'Finalizing Data';
    } else {
      message = 'Complete!';
    }
    
    $('#status-message').text(message);
  }

  // ====================
  // Visual countdown notification
  // ====================
  function showPollingNotification(totalSeconds) {
    $('#auto-refresh-notification').remove();
    
    const notification = $('<div>')
      .attr('id', 'auto-refresh-notification')
      .css({
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '20px 25px',
        backgroundColor: '#2196F3',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: 99999,
        fontFamily: 'Arial, sans-serif',
        fontSize: '15px',
        fontWeight: 'bold',
        minWidth: '320px',
        transition: 'background-color 0.5s ease'
      })
      .html(`
        <div style="margin-bottom: 12px; font-size: 16px; color: #000000;">
          Refreshing page in <span id="countdown-seconds" style="font-weight: bold;">${totalSeconds}</span> seconds...
        </div>
        <div id="road-container" style="position: relative; height: 40px; background-color: #555; border-radius: 4px; overflow: hidden; border: 2px solid rgba(255,255,255,0.3);">
          <div style="position: absolute; width: 100%; height: 100%; background-color: #555;"></div>
          <div style="position: absolute; width: 100%; top: 35%; height: 3%; background: repeating-linear-gradient(to right, #FFD700 0px, #FFD700 8px, transparent 8px, transparent 16px);"></div>
          <div style="position: absolute; width: 100%; top: 62%; height: 3%; background: repeating-linear-gradient(to right, #FFD700 0px, #FFD700 8px, transparent 8px, transparent 16px);"></div>
          <div id="car" style="position: absolute; top: 50%; transform: translateY(-50%) scaleX(-1); left: 0%; font-size: 24px; transition: left 0.3s linear; z-index: 10;">
            🚗
          </div>
          <div style="position: absolute; top: 50%; transform: translateY(-50%) rotate(0deg); right: 4px; z-index: 10;">
            <div style="position: relative; width: 32px; height: 32px; background: #DC143C; border: 2.5px solid white; border-radius: 3px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              <span style="color: white; font-size: 9px; font-weight: bold; font-family: Arial, sans-serif; line-height: 1; text-align: center;">DONE</span>
            </div>
          </div>
        </div>
        <div id="status-message" style="margin-top: 8px; font-size: 16px; opacity: 1; text-align: center; color: #000000; font-weight: 500;">
          Processing Request
        </div>
      `)
      .appendTo('body');
    
    notification.hide().fadeIn(300);
    
    return notification;
  }

  function updateCountdown(secondsLeft, totalSeconds) {
    $('#countdown-seconds').text(secondsLeft);
    
    // Calculate car position (0% to 85% to stop at the stop sign)
    const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 85;
    $('#car').css('left', progress + '%');
    
    // Update status message
    updateStatusMessage(secondsLeft);
    
    // Change background color based on time remaining
    const notification = $('#auto-refresh-notification');
    
    if (secondsLeft > 10) {
      notification.css('backgroundColor', '#2196F3');
    } else if (secondsLeft > 3) {
      notification.css('backgroundColor', '#FF9800');
    } else {
      notification.css('backgroundColor', '#FF6B6B');
    }
    
    // Add a little bounce to the car at certain intervals
    if (secondsLeft % 5 === 0 && secondsLeft > 0) {
      $('#car').css('transform', 'translateY(-60%) scaleX(-1) scale(1.1)');
      setTimeout(function() {
        $('#car').css('transform', 'translateY(-50%) scaleX(-1) scale(1)');
      }, 150);
    }
  }

  function showCompletion() {
    const notification = $('#auto-refresh-notification');
    notification.css('backgroundColor', '#4CAF50');
    $('#car').css('left', '85%');
    updateStatusMessage(0);
  }

  function removeNotification() {
    $('#auto-refresh-notification').fadeOut(300, function() {
      $(this).remove();
    });
  }

  // ====================
  // Trigger Flow U
  // ====================
  async function triggerFlowU(recordId, projectId, automationId) {
    try {
      log('🚀 Triggering Flow U directly...');
      log('📍 Record ID:', recordId);
      log('📍 Project ID:', projectId);
      log('🆔 Automation ID:', automationId);
      
      const response = await fetch(CONFIG.flowUWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          record_id: recordId,
          project_id: projectId,
          automation_id: automationId
        })
      });
      
      if (response.ok) {
        log('✅ Flow U triggered successfully!');
        return true;
      } else {
        log('❌ Flow U trigger failed:', response.status);
        return false;
      }
    } catch (error) {
      log('❌ Error triggering Flow U:', error.message);
      return false;
    }
  }

  // ====================
  // Start polling Flow P
  // ====================
  function startPolling(recordId, automationId) {
    log('🚀 Will start polling Flow P with:');
    log('📍 Record ID:', recordId);
    log('🆔 Automation ID:', automationId);
    log('⏰ Delay before first poll...');
    
    const totalSeconds = Math.floor(CONFIG.fallbackDelayMs / 1000);
    let secondsLeft = totalSeconds;
    let elapsedSeconds = 0;
    
    // Show countdown notification
    if (CONFIG.showCountdown) {
      showPollingNotification(totalSeconds);
    }
    
    // Start countdown timer (visual only)
    const countdownTimer = setInterval(function() {
      secondsLeft--;
      elapsedSeconds++;
      if (secondsLeft >= 0 && CONFIG.showCountdown) {
        updateCountdown(secondsLeft, totalSeconds);
      }
    }, 1000);
    
    // Delay before starting to poll
    setTimeout(function() {
      log('📡 Start polling Flow P');
      
      let pollingActive = true;
      let currentPollInterval = null;
      let switchedToFastPoll = false;
      
      // Function to do the polling
      async function doPoll() {
        if (!pollingActive) return;
        
        try {
          log('📡 Polling Flow P for completion...');
          
          const response = await fetch(CONFIG.flowPWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              action: 'check_status',
              record_id: recordId,
              automation_id: automationId
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            log('📥 Flow P response:', data);
            
            // Check for completion
            const status = String(data.status).toLowerCase();
            
            if (status === 'ready') {
              log('✅ READY SIGNAL RECEIVED FROM FLOW P!');
              log('🎯 Flow U has updated field_1637(AutomationID) and field_1539(Connected Round) in Knack');
              pollingActive = false;
              if (currentPollInterval) clearInterval(currentPollInterval);
              clearInterval(countdownTimer);
              
              if (CONFIG.showCountdown) {
                showCompletion();
              }
              
              setTimeout(function() {
                log('🔄 RELOADING PAGE NOW...');
                window.location.reload();
              }, 1000);
              
              return;
            } else {
              log('⏳ Status:', data.status, '(lowercase:', status + ') - Field not updated yet');
              if (data.current_value) {
                log('   Current field_1637 value:', data.current_value);
              }
            }
          }
        } catch (error) {
          log('❌ Poll error:', error.message);
        }
        
        // Check if we should switch to fast polling (1s intervals)
        const currentElapsed = (CONFIG.fallbackDelayMs - (secondsLeft * 1000));
        if (!switchedToFastPoll && currentElapsed >= CONFIG.fastPollStartMs) {
          log('⚡ Switching to fast polling (every 1 second)...');
          switchedToFastPoll = true;
          
          // Clear current interval and start faster one
          if (currentPollInterval) clearInterval(currentPollInterval);
          currentPollInterval = setInterval(doPoll, CONFIG.fastPollIntervalMs);
        }
      }
      
      // Start initial polling
      doPoll();
      currentPollInterval = setInterval(doPoll, CONFIG.pollIntervalMs);
      
      // Fallback: reload after 24 seconds regardless
      setTimeout(function() {
        if (pollingActive) {
          log('⏰ Fallback timer reached - reloading now');
          pollingActive = false;
          if (currentPollInterval) clearInterval(currentPollInterval);
          clearInterval(countdownTimer);
          
          if (CONFIG.showCountdown) {
            showCompletion();
          }
          
          setTimeout(function() {
            log('🔄 RELOADING PAGE NOW (fallback)...');
            window.location.reload();
          }, 1000);
        }
      }, CONFIG.fallbackDelayMs - CONFIG.initialDelayMs);
      
    }, CONFIG.initialDelayMs);
  }

  // ====================
  // Handle form submission
  // ====================
  let submissionDetected = false;
  
  $(document).on('knack-form-submit.any', function(event, view, record) {
    if (submissionDetected) {
      return;
    }
    
    log('📝 Form submitted on view:', view.key);
    
    if (view.key === CONFIG.triggerViewKey) {
      submissionDetected = true;
      
      log('✅ TRIGGER DETECTED!');
      log('📄 Record data:', record);
      
      // Extract record ID
      const recordId = record.id;
      
      if (!recordId) {
        log('❌ Could not get record ID');
        log('⚠️  Using fallback delay only');
        
        if (CONFIG.showCountdown) {
          showPollingNotification(Math.floor(CONFIG.fallbackDelayMs / 1000));
        }
        
        setTimeout(function() {
          log('🔄 RELOADING PAGE NOW (no record ID)...');
          window.location.reload();
        }, CONFIG.fallbackDelayMs);
        
        return;
      }
      
      // Extract project ID
      const projectId = getProjectId(record);
      
      if (!projectId) {
        log('❌ Could not get project ID');
        log('⚠️  Using fallback delay only');
        
        if (CONFIG.showCountdown) {
          showPollingNotification(Math.floor(CONFIG.fallbackDelayMs / 1000));
        }
        
        setTimeout(function() {
          log('🔄 RELOADING PAGE NOW (no project ID)...');
          window.location.reload();
        }, CONFIG.fallbackDelayMs);
        
        return;
      }
      
      // Generate automation ID
      const automationId = generateAutomationId(recordId);
      log('🆔 Generated Automation ID:', automationId);
      
      // Trigger Flow U
      triggerFlowU(recordId, projectId, automationId);
      
      // Start polling Flow P
      startPolling(recordId, automationId);
      
      // Reset flag after fallback window
      setTimeout(function() {
        submissionDetected = false;
      }, CONFIG.fallbackDelayMs + 5000);
    } else {
      log('⏭️  Not trigger view, ignoring');
    }
  });

  // ====================
  // Manual commands
  // ====================
  window.triggerRefreshNow = function() {
    log('🖱️  Manual refresh triggered');
    if (CONFIG.showCountdown) removeNotification();
    window.location.reload();
  };

  // Log startup info
  log('🚀 Triggers PA Flow U: Connect Cycle to Round');
  log('🔗 PA Flow P polls Automation ID for completion');
  log('⏰ Polling every 1s, fallback 24s');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

})(window.Knack);
