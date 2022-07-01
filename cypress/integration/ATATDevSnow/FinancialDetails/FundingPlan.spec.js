import { bootstrapMockApis,cleanText,randomNumber} from "../../../helpers";
import common from "../../../selectors/common.sel";
import fd from "../../../selectors/financialDetails.sel";

describe("Test suite: Financial Details Step: Funding Plan substep", () => {


  beforeEach(() => {
    bootstrapMockApis();
    cy.launchATAT();
        
  });
    
  it("TC1: Funding Plan on the Vertical Stepper is active", () => {
    cy.clickSideStepper(common.stepFinancialDetailsLink, " Financial Details ");
    //Verify the Substeps are  visible
    cy.textExists(common.subStepFundingPlanText, " Funding Plan ").click();
    cy.activeStep(common.stepFinancialDetailsText);
    cy.activeStep(common.subStepFundingPlanText);         
      
  });

  it("TC2: Asserts: Funding Request type", () => {
    cy.clickSideStepper(common.stepFinancialDetailsLink, " Financial Details ");
    //Verify the Substeps are  visible
    cy.textExists(common.subStepFundingPlanText, " Funding Plan ").click();;
    cy.verifyPageHeader("What type of funding request did you use for this acquisition?");
    
    const expectedBodytxt = "To complete this section," +
      " you will need an authorized funding request to transfer" +
      " funds from your agency to DITCO." +
      " We recommend using G-Invoicing to generate your 7600A and 7600B," +
      " but you will also be able to upload form(s) directly" +
      " from your computer. Learn more about funding requests"
    cy.verifyTextMatches(fd.intrpText, expectedBodytxt); 
    cy.textExists(fd.learnFundingLink, "Learn more about funding requests")
      .click({ force: true })
      .then(() => {
        cy.findElement(fd.slideoutPanel).should("be.visible");
        cy.textExists(fd.panelTitle, " Learn More ");
        cy.textExists(fd.panelMainLabelText, "Understanding funding requests");
        cy.textExists(fd.panelNextLabelText, "Fiscal Service Forms 7600A and 7600B");
        cy.findElement(fd.panelFARLink).scrollIntoView();
        cy.textExists(fd.panelFARLink, "Federal Acquisition Regulation (FAR) 253.208")
        cy.findElement(fd.panelClose).click()
          .then(() => {
            cy.findElement(fd.slideoutPanel).should("not.be.visible");
        
          });
      });      
      
    cy.radioBtn(fd.fsfRadioBtn, "FSF");
    cy.radioBtn(fd.miprRadioBtn, "MIPR");
    const fsfLabel = "Fiscal Service Forms (7600A and 7600B)" +
      "Import from G-Invoicing or manually upload your completed forms." +
      " Recommended"
    cy.verifyTextMatches(fd.fsfCardLabel, fsfLabel);
    const miprLabel = "Military Interdepartmental Purchase Request (MIPR)" +
      "Manually upload your completed DD Form 448."
    cy.verifyTextMatches(fd.miprCardLabel, miprLabel);
    cy.textExists(fd.aboutFRLink, " What if I don’t have a funding request yet? ")
      .click().then(() => {
        const aboutText = "Every agency manages the transfer" +
          " of funds differently, so we recommend contacting your" +
          " agency’s resource management division or financial" +
          " department to determine the best method for initiating" +
          " a funding request. G-Invoicing is the long-term solution for" +
          " Federal Program Agencies (FPAs) to manage their intragovernmental" +
          " (IGT) Buy/Sell transactions. This is the preferred system for" +
          " generating and maintaining your GT&Cs and Orders with DITCO." +
          " Learn more about G-Invoicing However, until your agency" +
          " migrates to G-Invoicing, we will still allow you to upload" +
          " forms that were generating using your agency’s" +
          " Enterprise Resource Planning (ERP) system." +
          " Whether using G-Invoicing or your ERP, you must obtain a signature" +
          " from your authorized financial point of contact before you can" +
          " proceed with this section."
        cy.verifyTextMatches(fd.aboutRequestMessage, aboutText);
        cy.textExists(fd.ginvoiceLink, " Learn more about G-Invoicing ").click()
          .then(() => {
            cy.findElement(fd.slideoutPanel).should("be.visible");
            cy.textExists(fd.panelTitle, " Learn More ");
            cy.textExists(fd.panelMainLabelText, "What is G-Invoicing?");
            cy.findElement(fd.panelNextLabelText).scrollIntoView();
            cy.textExists(fd.bureauLink, "Bureau of Fiscal Service, G-Invoicing");
            cy.textExists(fd.ginvoiceLoginLink, "G-Invoicing Login");
            cy.textExists(fd.panelNextLabelText, "How does G-Invoicing affect my acquisition?");
            cy.findElement(fd.panelClose).click()
              .then(() => {
                cy.findElement(fd.slideoutPanel).should("not.be.visible");
        
              });
          });
      })
    
  });

  it("TC3: Validations: Funding Request type", () => {
    cy.clickSideStepper(common.stepFinancialDetailsLink, " Financial Details ");
    //Verify the Substeps are  visible
    cy.textExists(common.subStepFundingPlanText, " Funding Plan ").click();;
    cy.verifyPageHeader("What type of funding request did you use for this acquisition?");    
    cy.radioBtn(fd.fsfRadioBtn, "FSF").focus();
    cy.clickSomethingElse(fd.fundingRadioError)
      .then(() => {
        cy.checkErrorMessage(fd.fundingRadioError, "Please select a type of funding request.");
      });
    
    
  });

  it("TC4: Select FSF as Funding Request type", () => {
    cy.clickSideStepper(common.stepFinancialDetailsLink, " Financial Details ");
    //Verify the Substeps are  visible
    cy.textExists(common.subStepFundingPlanText, " Funding Plan ").click();;
    cy.verifyPageHeader("What type of funding request did you use for this acquisition?");    
    cy.selectFundingRequest(fd.fsfRadioBtn, "FSF");
    const introText = "If you select Yes below, then we will" +
      " verify a few details and sync your funding request with this effort." +
      " Otherwise, you can manually upload forms from your computer. Learn more about G-Invoicing"
    cy.verifyTextMatches(common.introText, introText);
    cy.radioBtn(fd. ginvoiceYesRadioBtn, "Yes");
    cy.radioBtn(fd.ginvoiceNoRadioBtn, "No");
    const giYesLabel = "Yes. My General Terms & Conditions (GT&C) and Order are in G-Invoicing."
    cy.verifyTextMatches(fd.yesLabel, giYesLabel);
    const giNoLabel = "No. I would like to upload my 7600A and 7600B forms."
    cy.verifyTextMatches(fd.noLabel,giNoLabel);
        
  });


  it("TC5: Select MIPR as Funding Request type", () => {
    cy.clickSideStepper(common.stepFinancialDetailsLink, " Financial Details ");
    //Verify the Substeps are  visible
    cy.textExists(common.subStepFundingPlanText, " Funding Plan ").click();;
    cy.verifyPageHeader("What type of funding request did you use for this acquisition?");    
    cy.selectFundingRequest(fd.miprRadioBtn, "MIPR");
    cy.textExists(fd.miprTextLabel, " MIPR number ");
    const miprNo = "This number is assigned by your agency’s accounting and finance office." +
      " It is located in Box 5 on the MIPR form (DD Form 448)."
    cy.hoverToolTip(
      fd.miprTooltipBtn,
      fd.miprTooltipText, miprNo);
    const miprNumberValue= randomNumber(6)
    cy.enterTextInTextField(fd.miprTextbox, miprNumberValue);
    cy.textExists(fd.UploadLabel, "Upload your MIPR (DD Form 448)");      
    cy.textExists(fd.uploadLink, " browse to upload ");
    const filepath = "files/dd1155.pdf"
    cy.findElement('input[type="file"]').attachFile(filepath);
    cy.findElement(fd.fundingfileupload).click({ force: true });
    
  });
  
  it.skip("TC6: Upload a file", () => {
    cy.clickSideStepper(common.stepFinancialDetailsLink, " Financial Details ");
    //Verify the Substeps are  visible
    cy.textExists(common.subStepFundingPlanText, " Funding Plan ").click();;
    cy.verifyPageHeader("Upload your MIPR");
    
    const expectedBody = "Drag and Drop" +
      " your file here or browse to upload" +
      " Use a PDF file with a max size of 1 GB."
    cy.findElement(fd.fileUploadSection).then(($el) => {
      let actualTxt = $el.text();
      cy.log(actualTxt);
      const formattedTxt = cleanText(actualTxt)
      expect(formattedTxt).equal(expectedBody);
    });
    cy.textExists(fd.uploadLink, " browse to upload ");
    const filepath = "files/dd1155.pdf"
    cy.findElement('input[type="file"]').attachFile(filepath);
    cy.findElement(fd.fundingfileupload).click({ force: true }).then(() => {
      cy.findElement(fd.uploadedFile0Link).should("exist")
        .and("contain.text", "dd1155.pdf");
      cy.findElement(fd.uploadedFile0RemoveBtn).should("exist")
        .and("contain.text", "Remove");
    });    
    const filetwo="files/Requirements Checklist-DISA.pdf"
    cy.findElement('input[type="file"]').attachFile(filetwo);
    cy.findElement(fd.fundingfileupload).click({ force: true });
  });
  
  it.skip("TC7: Validations", () => {
    cy.clickSideStepper(common.stepFinancialDetailsLink, " Financial Details ");
    //Verify the Substeps are  visible
    cy.textExists(common.subStepFundingPlanText, " Funding Plan ").click();;
    cy.verifyPageHeader("Upload your MIPR");
    // upload file that is not pdf or excel
    const filepath = "files/textfile.txt"
    cy.findElement('input[type="file"]').attachFile(filepath);
    cy.findElement(fd.fundingfileupload).click({ force: true }).then(() => {
      cy.checkErrorMessage(
        fd.fundingfileuploadError,
        "'textfile.txt' is not a valid format or has been corrupted." +
        " Please upload a valid .xlsx, .xls or .pdf file.");
    });
    //attach invalid files  at the same time
    const file2 = "files/testforfileupload.docx"
    cy.findElement('input[type="file"]').attachFile(file2, filepath);
    cy.findElement(fd.fundingfileupload).click({ force: true }).then(() => {
      cy.checkErrorMessage(
        fd.fundingfileuploadError,
        "'textfile.txt' is not a valid format or has been corrupted." +
        " Please upload a valid .xlsx, .xls or .pdf file.");
      cy.checkErrorMessage(
        fd.fundingfileuploadError,
        "'testforfileu...oad.docx' is not a valid format or has been corrupted." +
        " Please upload a valid .xlsx, .xls or .pdf file.");
      
    });
  });

  it.skip("TC8: Remove: Uploaded file", () => {
    cy.clickSideStepper(common.stepFinancialDetailsLink, " Financial Details ");
    //Verify the Substeps are  visible
    cy.textExists(common.subStepFundingPlanText, " Funding Plan ").click();;
    cy.verifyPageHeader("Upload your MIPR");    
    const filepath = "files/dd1155.pdf"
    cy.findElement('input[type="file"]').attachFile(filepath);
    cy.findElement(fd.fundingfileupload).click({ force: true })
    cy.findElement(fd.uploadedFile0RemoveBtn).should("exist")
      .and("contain.text", "Remove");
    //click on Remove button
    cy.textExists(fd.uploadedFile0RemoveBtn, "Remove").click().then(() => {
      cy.findElement(fd.uploadedFile0Link).should("not.exist");
      
    })
  });
  
  it.skip("TC8: Upload file with drag and drop mode", () => {
    cy.hopOutOfIframe(true, true);
    cy.clickSideStepper(common.stepFinancialDetailsLink, " Financial Details ");
    //Verify the Substeps are  visible
    cy.textExists(common.subStepFundingPlanText, " Funding Plan ").click();;
    cy.verifyPageHeader("Upload your MIPR");
    const file = "files/Test.xlsx"
    cy.findElement('input[type="file"]').attachFile(file,{ action: 'drag-drop' });
    cy.findElement(fd.fundingfileupload).click({ force: true })
    cy.findElement(fd.uploadedFile0RemoveBtn).should("exist")
      .and("contain.text", "Remove");
    //click on Remove button
    cy.textExists(fd.uploadedFile0RemoveBtn, "Remove").click().then(() => {
      cy.findElement(fd.uploadedFile0Link).should("not.exist");
      
    })
  });

});