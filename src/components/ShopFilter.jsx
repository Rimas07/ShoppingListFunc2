import React from 'react';

const ShopFilter = (props) => {
  const isActive = (value) => {
    return "btn " + (value === props.filter[0].Status ? "btn-Kaufland" : "default");
  };

  const isCompleted = (value) => {
    const status = props.filter[0].Status;

    if (status === "SHOW_ALL") {
      return true; // Show all items
    } else if (status === "SHOW_INCOMPLETE") {
      return !value; // Show incomplete items
    } else if (status === "SHOW_COMPLETE") {
      return value; // Show completed items
    }

    return false;
  };

  // New function to handle completion
  const completeList = () => {
    // Implement the logic to mark the list as complete
    console.log("Completing the list");
    // Call a function passed as a prop from the parent component, e.g., props.onCompleteList()
    if (props.onCompleteList) {
      props.onCompleteList();
    }
  };

  return (
    <div className="row">
      <div className="col-xs-7">
        <div id="todo-filter" className="input-group">
          <span className="input-group-btn">
            {/* Add a button to trigger the completeList function */}
            <button className="btn btn-default" type="button" onClick={completeList}>
              Complete List
            </button>
          </span>
          <div className="search">
            {/* Add your search input */}
            <input
              type="search"
              className="form-control"
              ref={props.inputRef}
              onChange={props.onSearch}
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="col-xs-5">
        <ul className="nav nav-pills todo-filter">
          <li>
            <a
              href="All"
              onClick={props.onFilter}
              className={isActive("SHOW_ALL")}
              value="SHOW_ALL"
            >
              All
            </a>
          </li>
          <li>
            <a
              href="Incompleted"
              onClick={props.onFilter}
              className={isActive("SHOW_INCOMPLETE")}
              value="SHOW_INCOMPLETE"
            >
              Incomplete
            </a>
          </li>
          <li>
            <a
              href="Completed"
              onClick={props.onFilter}
              className={isActive("SHOW_COMPLETE")}
              value="SHOW_COMPLETE"
            >
              Complete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShopFilter;
