const viewModel = require("../models/viewModel")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const viewCont = {}

viewCont.buildviewUpdate = async (req, res, next) => {
    const view_id = req.params.viewId
    let nav = await utilities.getNav()
    const data = await viewModel.getviewByviewId(view_id)
    const itemData = data[0]
    const title = itemData.title
  res.render("./view/update", {
    title: "Edit view for " + title,
    nav,
    errors: null,
    view_id: itemData.view_id,
    view_comment: itemData.view_comment,
  })

}

viewCont.buildviewDelete = async (req, res, next) => {
    const view_id = req.params.viewId
    let nav = await utilities.getNav()
    const data = await viewModel.getviewByviewId(view_id)
    if(!data){
        req.flash("notice", `Invalid Request`)
    res.redirect("/account/")
    }
    const itemData = data[0]
    const title = itemData.title
  res.render("./view/delete", {
    title: "Delete view for " + title,
    nav,
    errors: null,
    view_id: itemData.view_id,
    view_comment: itemData.view_comment,
    })
}

viewCont.addview = async (req, res, next) =>{
    const {
        account_id,
        inv_id, 
        view_comment
      } = req.body
      const invResult = await viewModel.addview(
        account_id,
        inv_id,
        view_comment
      )
      const data = await invModel.getInventoryByInvId(inv_id)
      const block = await utilities.buildSingleInventoryBlock(data)
      const views = await viewModel.getviewByInvId(inv_id)
      let nav = await utilities.getNav()
      const className = data[0].inv_year +" "+ data[0].inv_make +" "+ data[0].inv_model
    if (invResult) {
      req.flash(
        "notice",
        `Vehicle Added Successfully.`
      )
      res.render("./inventory/vehicle", {
        title: className,
        nav,
        errors: null,
        inv_id: inv_id,
        block,
        views
      })
    } else {
      
      req.flash("notice", "Sorry, adding the Vehicle failed.")
      res.render("./inventory/vehicle", {
        title: className,
        nav,
        errors: null,
        inv_id: inv_id,
        block,
        views
      })
      }
}
viewCont.updateview = async (req, res, next) => {
    const {
        view_comment,
        view_id,
        
      } = req.body
      const updateResult = await viewModel.updateview(
        view_comment,
        view_id,
      )
    
      if (updateResult) {
        req.flash("notice", `view was successfully updated.`)
        res.redirect("/account/")
      } else {
        const invItem = invModel.getInventoryByInvId(updateResult.inv_id)
        const title = `${invItem.inv_make} ${invItem.inv_model}`
        req.flash("notice", "Sorry, the update failed.")
        res.status(501).render("./view/update", {
            title: "Edit view for " + title,
        nav,
        errors: null,
        view_comment,
        view_id,
        })
      }
}

viewCont.deleteview = async (req, res, next) => {
    const {
        view_id,
    } = req.body
    let nav = await utilities.getNav()
    const deleteResult = await viewModel.deleteview(
        view_id,  
    )
  if (deleteResult) {
    req.flash("notice", `The view was successfully delted.`)
    res.redirect("/account/")
  } else {
    const data = await viewModel.getviewByviewId(view_id)
    const viewData = data[0]
    req.flash("notice", "Sorry, the delete failed.")
    res.status(501).render("./view/delete", {
        title: "Delete view for " + viewData.title,
        nav,
        errors: null,
        view_id: viewData.view_id,
        view_comment: viewData.view_comment,
    })
  }
}

module.exports = viewCont
