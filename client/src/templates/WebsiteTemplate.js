export default {
    build: ({
        firstname,
        phonenumber,
        email,
        businessName,
        businessDescription,
        deadline,
        isRedesign,
        hosting,
        fieldofstudy,
        budget,
        pages,
        actions,
        features,
        functionality,
        isSinglePage,
        isResponsive,
        websiteLikeEx,
        websiteDislikeEx,
        hasLogo,
        branding,
        businessDiscovery,
        target,
        searchTerms,
        socialMediaPlatforms,
        feed,
        competitors,
        prints,
        hasRoutineUpdates,
        automaticUpdate,
        futureFeatures
    }) => `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                    <title>Website Request Template</title>
                    <style>
                        .inline-header {
                            display: inline;
                        }
                        .required {
                            color: #f00
                        }
                    </style>
                </head>
                <body>
                    <div>
                        <section>
                            <h4 class="inline-header">Enter Your Name:</h4>
                            <span>${firstname}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Enter Phone Number:</h4>
                            <span>${phonenumber}</span>
                        </section>
                        <section class="required">
                            <h4 class="inline-header">Enter Your Email *:</h4>
                            <span>${email}</span>
                        </section>
                        <hr>
                        <section>
                            <h4 class="inline-header">What is the name of your business?:</h4>
                            <span>${businessName}</span>
                        </section>
                    <section>
                            <h4 class="inline-header">Describe your business and what products or services you offer.:</h4>
                            <span>${businessDescription}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Do you have a timeframe or deadline for your websites launch?:</h4>
                            <span>${deadline}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Is this a site re-design?</h4>
                            <span>${isRedesign ? isRedesign.title : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Do you currently have hosting?:</h4>
                            <span>${hosting ? hosting.title : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Do you currently have a domain?:</h4>
                            <span>${fieldofstudy}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">What is your budget for this project?:</h4>
                            <span>${budget}</span>
                        </section>
                        <hr>
                        <section>
                            <h4 class="inline-header">Roughly, how many pages will your site consist of?:</h4>
                            <span>${pages}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">What actions should the user perform when visiting your site?:</h4>
                            <span>${actions ? actions.title : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Please check which features you are interested in.:</h4>
                            <span>${features ? features.title : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Is there any specific functionality that your site needs that wasn't mentioned?:</h4>
                            <span>${functionality}</span>
                        </section>
                        <hr>
                        <section>
                            <h4 class="inline-header">Are you interested in a single page design?:</h4>
                            <span>${isSinglePage ? isSinglePage.title : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Are you interested in a responsive Design?:</h4>
                            <span>${isResponsive ? isResponsive.title : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Do you have any examples of website that you like? What do you like about them?:</h4>
                            <span>${websiteLikeEx}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Do you have any examples of website that you dislike? What do you dislike about them?:</h4>
                            <span>${websiteDislikeEx}</span>
                        </section>
                    <section>
                            <h4 class="inline-header">Do you have a logo?:</h4>
                            <span>${hasLogo ? hasLogo.title : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header"> Do you have branding that the websites design should reflect upon? (e.g. colors, fonts, themes)?:</h4>
                            <span>${branding}</span>
                            <hr>
                        </section>
                            <section>
                            <h4 class="inline-header"> How do people find out about your business right now?:</h4>
                            <span>${businessDiscovery}</span>
                        </section>
                        <section>
                            <h4 class="inline-header"> Who is your target demographic?:</h4>
                            <span>${target}</span>
                        </section>
                        <section>
                            <h4 class="inline-header"> If someone is searching for your product/service, which search terms might they use?:</h4>
                            <span>${searchTerms}</span>
                        </section>
                        <section>
                            <h4 class="inline-header"> Is your business currently active on any social media platforms?:</h4>
                            <span>${socialMediaPlatforms ? socialMediaPlatforms.isResponsive : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header"> Do you wish to incorporate any social media feeds into your site?:</h4>
                            <span>${feed}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Please include links to any notable competitors that you have.:</h4>
                            <span>${competitors}</span>
                        </section>
                        <section>
                            <h4 class="inline-header">Will you need printed materials produced?:</h4>
                            <span>${prints ? prints.title : ''}</span>
                        </section>
                        <hr>
                        <section>
                            <h4 class="inline-header"Do you think you will need routine updates on your website?:</h4>
                            <span>${hasRoutineUpdates ? hasRoutineUpdates.title : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header"Would you like to be able to do most of the updating yourself?:</h4>
                            <span>${automaticUpdate ? automaticUpdate.title : ''}</span>
                        </section>
                        <section>
                            <h4 class="inline-header"Are there any features that you don't want now but may want in the future?:</h4>
                            <span>${futureFeatures}</span>
                        </section>
                    </div>
                </body>
            </html>
        `
}
