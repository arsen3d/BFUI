import { Meteor } from 'meteor/meteor';
import "/imports/api/server/methods"
import "/imports/api/server/publish"
Meteor.startup(() => {
    process.env.MAIL_URL="smtp://apikey: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@smtp.sendgrid.net:587";
  // code to run on server at startup
    Accounts.emailTemplates.siteName = "Blockfreight";
    Accounts.emailTemplates.from = "Accounts accounts@blockfreight.com";
    Accounts.emailTemplates.verifyEmail = {
        subject() {
            return "[Blockfreight] Verify Your Email Address";
        },
        text( user, url ) {
            //console.log(user, url);
            let emailAddress = user.emails[0].address,
                urlWithoutHash = url.replace( '#/', '' ),
                supportEmail = "accounts@blockfreight.com",
                emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

            return emailBody;
        }
    };
    // Accounts.validateLoginAttempt (attempt) ->
    // if attempt.user and attempt.user.emails and not attempt.user.emails[0].verified
    // console.log "email not verified"
    // return false # the login is aborted
    // true
});
