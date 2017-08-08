var C = {
  IMPLEM_UID : "1.2.840.0.1.3680045.8.641",
  IMPLEM_VERSION : "OHIF-DCM-0.1",
  APPLICATION_CONTEXT_NAME : "1.2.840.10008.3.1.1.1",
  PROTOCOL_VERSION : "0001",
  ITEM_TYPE_RESERVED : "00",
  ITEM_TYPE_APPLICATION_CONTEXT : "10",
  ITEM_TYPE_PDU_ASSOCIATE_RQ : "01",
  ITEM_TYPE_PDU_ASSOCIATE_AC : "02",
  ITEM_TYPE_PDU_PDATA : "04",
  ITEM_TYPE_PDU_RELEASE_RQ : "05",
  ITEM_TYPE_PDU_RELEASE_RP : "06",
  ITEM_TYPE_PDU_AABORT : "07",
  ITEM_TYPE_PRESENTATION_CONTEXT : "20",
  ITEM_TYPE_PRESENTATION_CONTEXT_AC : "21",
  ITEM_TYPE_ABSTRACT_CONTEXT : "30",
  ITEM_TYPE_TRANSFER_CONTEXT : "40",
  ITEM_TYPE_USER_INFORMATION : "50",
  ITEM_TYPE_MAXIMUM_LENGTH : "51",
  ITEM_TYPE_IMPLEMENTATION_UID : "52",
  ITEM_TYPE_IMPLEMENTATION_VERSION : "55",
  IMPLICIT_LITTLE_ENDIAN : "1.2.840.10008.1.2",
  EXPLICIT_LITTLE_ENDIAN : "1.2.840.10008.1.2.1",
  EXPLICIT_BIG_ENDIAN : "1.2.840.10008.1.2.2",
  SOP_PATIENT_ROOT_FIND : "1.2.840.10008.5.1.4.1.2.1.1",
  SOP_PATIENT_ROOT_MOVE : "1.2.840.10008.5.1.4.1.2.1.2",
  SOP_PATIENT_ROOT_GET : "1.2.840.10008.5.1.4.1.2.1.3",
  SOP_STUDY_ROOT_FIND : "1.2.840.10008.5.1.4.1.2.2.1",
  SOP_STUDY_ROOT_MOVE : "1.2.840.10008.5.1.4.1.2.2.2",
  SOP_STUDY_ROOT_GET : "1.2.840.10008.5.1.4.1.2.2.3",
  SOP_VERIFICATION : "1.2.840.10008.1.1",
  SOP_HANGING_PROTOCOL_FIND : "1.2.840.10008.5.1.4.38.2",
  SOP_MR_IMAGE_STORAGE : "1.2.840.10008.5.1.4.1.1.4",
  TYPE_ASCII : 1,
  TYPE_HEX : 2,
  TYPE_UINT8 : 3,
  TYPE_UINT16 : 4,
  TYPE_UINT32 : 5,
  TYPE_COMPOSITE : 6,
  TYPE_FLOAT : 7,
  TYPE_DOUBLE : 8,
  TYPE_INT8 : 9,
  TYPE_INT16 : 10,
  TYPE_INT32 : 11,
  RESULT_REASON_ACCEPTANCE : 0,
  RESULT_REASON_USER_REJECTION : 1,
  RESULT_REASON_NO_REASON :2,
  RESULT_REASON_ABSTRACT_NOT_SUPPORTED : 3,
  RESULT_REASON_TRANSFER_NOT_SUPPORTED : 4,
  DEFAULT_MESSAGE_ID : 1,
  LITTLE_ENDIAN : 1,
  BIG_ENDIAN : 2,
  VM_SINGLE :1,
  VM_TWO : 3,
  VM_THREE : 4,
  VM_FOUR : 5,
  VM_1N : 6,
  VM_2N :7,
  VM_3N :8,
  VM_6N :9,
  VM_3_3N : 10,
  VM_2_2N : 11,
  VM_16 : 12,
  VM_1_2 : 13,
  VM_1_3 : 18,
  VM_SIX : 14,
  VM_NINE : 15,
  VM_1_32 : 16,
  VM_1_99 : 17,
  PRIORITY_LOW : 0x2,
  PRIORITY_MEDIUM : 0x0,
  PRIORITY_HIGH : 0x1,
  DATA_SET_PRESENT : 1,
  DATE_SET_ABSENCE : 0x0101,
  DATA_TYPE_COMMAND : 1,
  DATA_TYPE_DATA : 0,
  DATA_IS_LAST : 1,
  DATA_NOT_LAST : 0,
  SOURCE_SERVICE_USER : 0,
  SOURCE_SERVICE_PROVIDER : 2,
  QUERY_RETRIEVE_LEVEL_STUDY : "STUDY",
  QUERY_RETRIEVE_LEVEL_IMAGE : "IMAGE",
  VALUE_LENGTH_UNDEFINED : 0xffffffff,
  STATUS_SUCCESS : 0x0000,
  STATUS_CANCEL : 0xfe00,
  STATUS_CFIND_CONT_OK : 0xff00,
  STATUS_CFIND_CONT_WARN : 0xff01,
  COMMAND_C_GET_RSP : 0x8010,
  COMMAND_C_MOVE_RSP : 0x8021,
  COMMAND_C_GET_RQ : 0x10,
  COMMAND_C_STORE_RQ : 0x01,
  COMMAND_C_FIND_RSP : 0x8020,
  COMMAND_C_MOVE_RQ : 0x21,
  COMMAND_C_FIND_RQ : 0x20,
  COMMAND_C_STORE_RSP : 0x8001
};

/*Object.defineProperty(global, "C", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: C
});*/

module.exports = C;
